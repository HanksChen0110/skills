param([Parameter(Mandatory=$true)][string]$Path)
$ErrorActionPreference='Stop'
$fs = [System.IO.File]::Open($Path, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
try {
  $tmp = Join-Path $env:TEMP ([guid]::NewGuid().ToString() + '.docx')
  $out = [System.IO.File]::Create($tmp)
  try { $fs.CopyTo($out) } finally { $out.Dispose() }
  Write-Output $tmp
}
finally { $fs.Dispose() }
