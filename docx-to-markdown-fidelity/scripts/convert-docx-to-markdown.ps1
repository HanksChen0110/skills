param(
    [Parameter(Mandatory = $true)]
    [string]$InputDocx,

    [Parameter(Mandatory = $true)]
    [string]$OutputMarkdown
)

# Set-StrictMode disabled for XML node compatibility
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-AttrValue {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$LocalName
    )
    if (-not $Node) {
        return $null
    }
    foreach ($attr in $Node.Attributes) {
        if ($attr.LocalName -eq $LocalName -or $attr.Name -eq $LocalName) {
            return $attr.Value
        }
    }
    return $null
}

function Select-One {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$XPath
    )
    if (-not $Node) {
        return $null
    }
    return $Node.SelectSingleNode($XPath)
}

function Select-Many {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$XPath
    )
    if (-not $Node) {
        return @()
    }
    return @($Node.SelectNodes($XPath))
}

function Get-EntryXml {
    param(
        [System.IO.Compression.ZipArchive]$Zip,
        [string]$EntryName
    )

    $entry = $Zip.GetEntry($EntryName)
    if (-not $entry) {
        return $null
    }

    $stream = $entry.Open()
    try {
        $reader = New-Object System.IO.StreamReader($stream)
        try {
            [xml]$xml = $reader.ReadToEnd()
        }
        finally {
            $reader.Dispose()
        }
    }
    finally {
        $stream.Dispose()
    }

    return $xml
}

function Get-RelationshipsMap {
    param([System.IO.Compression.ZipArchive]$Zip)

    $relsXml = Get-EntryXml -Zip $Zip -EntryName 'word/_rels/document.xml.rels'
    $map = @{}
    if (-not $relsXml) {
        return $map
    }

    foreach ($relationship in (Select-Many $relsXml "/*[local-name()='Relationships']/*[local-name()='Relationship']")) {
        $id = Get-AttrValue $relationship 'Id'
        $target = Get-AttrValue $relationship 'Target'
        if ($id -and $target) {
            $map[$id] = $target
        }
    }
    return $map
}

function Ensure-CleanDirectory {
    param([string]$Path)

    if (Test-Path -LiteralPath $Path) {
        Get-ChildItem -LiteralPath $Path -Force | Remove-Item -Recurse -Force
        return
    }

    New-Item -ItemType Directory -Path $Path -Force | Out-Null
}

function Export-ParagraphImages {
    param(
        [System.Xml.XmlNode]$Paragraph,
        [System.IO.Compression.ZipArchive]$Zip,
        [hashtable]$Relationships,
        [string]$AssetDir,
        [string]$AssetDirName,
        [hashtable]$ExportedImages,
        [ref]$NextImageIndex
    )

    $imageLinks = New-Object System.Collections.Generic.List[string]
    foreach ($blip in (Select-Many $Paragraph ".//*[local-name()='blip']")) {
        $relId = Get-AttrValue $blip 'embed'
        if (-not $relId) { continue }
        if (-not $Relationships.ContainsKey($relId)) { continue }

        $target = $Relationships[$relId] -replace '\\', '/'
        $target = $target.TrimStart('.', '/')
        if (-not $target) { continue }

        $entryName = if ($target.StartsWith('word/')) { $target } else { "word/$target" }
        if (-not $ExportedImages.ContainsKey($entryName)) {
            $entry = $Zip.GetEntry($entryName)
            if (-not $entry -or $entry.Length -le 0) { continue }

            $extension = [System.IO.Path]::GetExtension($entryName)
            if ([string]::IsNullOrWhiteSpace($extension)) {
                $extension = '.bin'
            }

            $fileName = ('image-{0:D2}{1}' -f $NextImageIndex.Value, $extension.ToLowerInvariant())
            $NextImageIndex.Value++
            $destination = Join-Path $AssetDir $fileName

            $sourceStream = $entry.Open()
            try {
                $destinationStream = [System.IO.File]::Create($destination)
                try {
                    $sourceStream.CopyTo($destinationStream)
                }
                finally {
                    $destinationStream.Dispose()
                }
            }
            finally {
                $sourceStream.Dispose()
            }

            $ExportedImages[$entryName] = ($AssetDirName + '/' + $fileName)
        }

        $relativePath = $ExportedImages[$entryName]
        if (-not $imageLinks.Contains($relativePath)) {
            [void]$imageLinks.Add($relativePath)
        }
    }

    return $imageLinks
}

function Normalize-Text {
    param([string]$Text)
    if ($null -eq $Text) {
        return ''
    }
    $normalized = $Text -replace '\s+', ' '
    return $normalized.Trim()
}

function Get-ParagraphText {
    param([System.Xml.XmlNode]$Paragraph)

    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($node in (Select-Many $Paragraph ".//*[local-name()='r']")) {
        foreach ($child in $node.ChildNodes) {
            switch ($child.LocalName) {
                't' { [void]$parts.Add($child.InnerText) }
                'tab' { [void]$parts.Add("`t") }
                'br' { [void]$parts.Add("`n") }
                'cr' { [void]$parts.Add("`n") }
                'noBreakHyphen' { [void]$parts.Add('-') }
            }
        }
    }

    $text = ($parts -join '')
    $text = $text -replace "`r", ''
    $text = $text -replace "[`n`t]+", ' '
    return Normalize-Text $text
}

function Get-ParagraphMeta {
    param([System.Xml.XmlNode]$Paragraph)

    $styleNode = Select-One $Paragraph "./*[local-name()='pPr']/*[local-name()='pStyle']"
    $jcNode = Select-One $Paragraph "./*[local-name()='pPr']/*[local-name()='jc']"
    $numPr = Select-One $Paragraph "./*[local-name()='pPr']/*[local-name()='numPr']"

    $fontSizes = @(
        (Select-Many $Paragraph ".//*[local-name()='rPr']/*[local-name()='sz']") | ForEach-Object { Get-AttrValue $_ 'val' }
    ) | Where-Object { $_ }

    $maxSize = 0
    foreach ($size in $fontSizes) {
        $parsed = 0
        if ([int]::TryParse($size, [ref]$parsed) -and $parsed -gt $maxSize) {
            $maxSize = $parsed
        }
    }

    [pscustomobject]@{
        StyleId = Get-AttrValue $styleNode 'val'
        Align   = Get-AttrValue $jcNode 'val'
        NumId   = Get-AttrValue (Select-One $numPr "./*[local-name()='numId']") 'val'
        Ilvl    = Get-AttrValue (Select-One $numPr "./*[local-name()='ilvl']") 'val'
        MaxSize = $maxSize
        IsBold  = (Select-Many $Paragraph ".//*[local-name()='rPr']/*[local-name()='b']").Count -gt 0
    }
}

function Get-HeadingLevel {
    param(
        [string]$Text,
        $Meta
    )

    if ([string]::IsNullOrWhiteSpace($Text)) { return 0 }
    if ($Meta.StyleId -match '^Heading([1-6])$') { return [int]$Matches[1] }
    if ($Text -match '^\d+(\.\d+){0,5}\s+\S+' -and $Text.Length -le 80 -and $Text -notmatch '[：:。；;]') {
        return [Math]::Min(([regex]::Matches($Text, '\.')).Count + 1, 6)
    }
    return 0
}

function Convert-TableToMarkdown {
    param([System.Xml.XmlNode]$Table)

    $rows = @()
    foreach ($tr in (Select-Many $Table "./*[local-name()='tr']")) {
        $cells = @()
        foreach ($tc in (Select-Many $tr "./*[local-name()='tc']")) {
            $texts = @()
            foreach ($p in (Select-Many $tc "./*[local-name()='p']")) {
                $cellText = Get-ParagraphText -Paragraph $p
                if ($cellText) { $texts += $cellText }
            }
            $cells += (($texts -join '<br>').Replace('|', '\|'))
        }
        if ($cells.Count -gt 0) { $rows += ,$cells }
    }

    if ($rows.Count -eq 0) { return @() }

    $rows = @(
        $rows | Where-Object {
            (($_ | ForEach-Object { Normalize-Text $_ }) -join '') -ne ''
        }
    )

    if ($rows.Count -eq 0) { return @() }

    $columnCount = ($rows | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
    $normalizedRows = foreach ($row in $rows) {
        $newRow = @($row)
        while ($newRow.Count -lt $columnCount) { $newRow += '' }
        ,$newRow
    }

    $separator = for ($i = 0; $i -lt $columnCount; $i++) { '---' }
    $lines = New-Object System.Collections.Generic.List[string]
    [void]$lines.Add('| ' + ($normalizedRows[0] -join ' | ') + ' |')
    [void]$lines.Add('| ' + ($separator -join ' | ') + ' |')

    for ($i = 1; $i -lt $normalizedRows.Count; $i++) {
        [void]$lines.Add('| ' + ($normalizedRows[$i] -join ' | ') + ' |')
    }
    return $lines
}

$zip = [System.IO.Compression.ZipFile]::OpenRead($InputDocx)
try {
    [xml]$documentXml = Get-EntryXml -Zip $zip -EntryName 'word/document.xml'
    $relationships = Get-RelationshipsMap -Zip $zip
}
finally {
}

if (-not $documentXml) {
    throw "无法读取文档内容: $InputDocx"
}

$body = Select-One $documentXml "/*[local-name()='document']/*[local-name()='body']"
if (-not $body) {
    throw "文档缺少 body 节点: $InputDocx"
}

$outputDir = Split-Path -Parent $OutputMarkdown
if (-not (Test-Path -LiteralPath $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$assetDirName = ([System.IO.Path]::GetFileNameWithoutExtension($OutputMarkdown) + '.assets')
$assetDir = Join-Path $outputDir $assetDirName
Ensure-CleanDirectory -Path $assetDir

$exportedImages = @{}
$nextImageIndex = 1
$lines = New-Object System.Collections.Generic.List[string]

try {
    foreach ($child in $body.ChildNodes) {
        switch ($child.LocalName) {
            'p' {
                $text = Get-ParagraphText -Paragraph $child
                $imageLinks = Export-ParagraphImages -Paragraph $child -Zip $zip -Relationships $relationships -AssetDir $assetDir -AssetDirName $assetDirName -ExportedImages $exportedImages -NextImageIndex ([ref]$nextImageIndex)
                if ([string]::IsNullOrWhiteSpace($text) -and $imageLinks.Count -eq 0) { continue }

                if (-not [string]::IsNullOrWhiteSpace($text)) {
                    $meta = Get-ParagraphMeta -Paragraph $child
                    $headingLevel = Get-HeadingLevel -Text $text -Meta $meta

                    if ($headingLevel -gt 0) {
                        [void]$lines.Add(('#' * $headingLevel) + ' ' + $text)
                        [void]$lines.Add('')
                    }
                    elseif ($text -match '^(图|表)\s*\d+') {
                        [void]$lines.Add('*' + $text + '*')
                        [void]$lines.Add('')
                    }
                    elseif ($meta.NumId) {
                        $indent = ''
                        if ($meta.Ilvl) { $indent = '  ' * [int]$meta.Ilvl }
                        [void]$lines.Add("$indent- $text")
                    }
                    else {
                        [void]$lines.Add($text)
                        [void]$lines.Add('')
                    }
                }

                foreach ($imageLink in $imageLinks) {
                    [void]$lines.Add("![]($imageLink)")
                    [void]$lines.Add('')
                }
            }
            'tbl' {
                $tableLines = Convert-TableToMarkdown -Table $child
                foreach ($line in $tableLines) { [void]$lines.Add($line) }
                if ($tableLines.Count -gt 0) { [void]$lines.Add('') }
            }
        }
    }
}
finally {
    $zip.Dispose()
}

$content = ($lines -join [Environment]::NewLine) -replace "(\r?\n){3,}", ([Environment]::NewLine + [Environment]::NewLine)
[System.IO.File]::WriteAllText($OutputMarkdown, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote: $OutputMarkdown"


