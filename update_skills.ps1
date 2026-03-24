$dir = "G:\CHLobsidian\skills"
$folders = Get-ChildItem -Path $dir -Directory | Where-Object { Test-Path (Join-Path $_.FullName ".git") }

$results = @()
$upToDateCount = 0

foreach ($folder in $folders) {
    if (-not (Test-Path (Join-Path $folder.FullName ".git"))) {
        continue
    }
    Push-Location $folder.FullName
    $remote = git remote
    if (-not $remote) {
        $results += "$($folder.Name): No remote configured"
        Pop-Location
        continue
    }

    Write-Host "Fetching $($folder.Name)..."
    git fetch origin --quiet

    $statusStr = git status -uno
    $statusArray = $statusStr -split "`n"
    $branchStatus = $statusArray | Select-Object -First 2 | Out-String
    
    if ($branchStatus -match "behind") {
        $porcelain = git status --porcelain
        if ($porcelain) {
            Write-Host "  Warning: $($folder.Name) is behind remote but has local changes (skipped)."
            $results += "$($folder.Name): Behind remote but has local changes (skipped)"
        } else {
            Write-Host "  Updating $($folder.Name)..."
            $pullResult = git pull --quiet
            if ($?) {
                $results += "$($folder.Name): Updated successfully"
            } else {
                $results += "$($folder.Name): Failed to pull updates"
            }
        }
    } elseif ($branchStatus -match "up to date" -or $branchStatus -match "ahead") {
        $upToDateCount += 1
    } else {
        $results += "$($folder.Name): Unknown status"
    }
    
    Pop-Location
}

Write-Host ""
Write-Host "--- Summary ---"
Write-Host "Up-to-date skills: $upToDateCount"
if ($results.Count -gt 0) {
    Write-Host "Updated / Skipped skills:"
    $results | ForEach-Object { Write-Host " - $_" }
}
