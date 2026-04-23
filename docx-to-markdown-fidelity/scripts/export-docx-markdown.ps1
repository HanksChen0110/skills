param(
    [Parameter(Mandatory = $true)]
    [string]$InputDocx,

    [Parameter(Mandatory = $true)]
    [string]$OutputMarkdown
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$copied = & (Join-Path $scriptDir 'copy-locked-docx.ps1') -Path $InputDocx

try {
    & (Join-Path $scriptDir 'convert-docx-to-markdown.ps1') -InputDocx $copied -OutputMarkdown $OutputMarkdown
}
finally {
    if ($copied -and (Test-Path -LiteralPath $copied)) {
        Remove-Item -LiteralPath $copied -Force
    }
}
