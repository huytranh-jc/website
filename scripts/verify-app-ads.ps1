<#
.SYNOPSIS
    Verify app-ads.txt against IAB app-ads.txt / Google AdMob format rules.

.DESCRIPTION
    Checks the repo's app-ads.txt for the common breakages that happen when the
    file is regenerated from the Google Sheet CSV export:
      1. Stray CSV quotes wrapping a line ("...").
      2. Wrong field count (data lines must have 3 or 4 comma-separated fields).
      3. Invalid relationship field (must be DIRECT or RESELLER; wrong case warns).
      4. Domain (field 1) should contain a dot (catches a missing TLD, e.g. a bare
         "lemmatechnologies" that should be "lemmatechnologies.com"). WARN only:
         a bad field-1 is publisher junk data, not a file-format break.
      5. Comment (#...) and blank lines are skipped, not validated.
      6. Encoding: warns (does not fail) if BOM present or line endings are not CRLF.

    Exit code 0 = pass (no errors). Exit code 1 = one or more errors found.
    Warnings alone do not fail the run.

.PARAMETER Path
    Path to app-ads.txt. Defaults to the repo root copy next to this script.

.PARAMETER CrossCheck
    Also strip-quote the Google Sheet CSV export and compare it line-by-line
    against app-ads.txt, to catch a file that was hand-edited out of sync with
    the sheet. Off by default (the CSV lives in ~/Downloads and may be absent).

.PARAMETER CsvPath
    Path to the CSV export used by -CrossCheck.
    Defaults to "~/Downloads/joycraft _ app-ads.txt - Sheet1.csv".

.EXAMPLE
    pwsh scripts/verify-app-ads.ps1
    pwsh scripts/verify-app-ads.ps1 -CrossCheck
#>
[CmdletBinding()]
param(
    [string]$Path,
    [switch]$CrossCheck,
    [string]$CsvPath
)

$ErrorActionPreference = 'Stop'

# --- Resolve default paths relative to this script (repo root is the parent) ---
$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $Path)    { $Path    = Join-Path $repoRoot 'app-ads.txt' }
if (-not $CsvPath) { $CsvPath = Join-Path $HOME 'Downloads\joycraft _ app-ads.txt - Sheet1.csv' }

if (-not (Test-Path -LiteralPath $Path)) {
    Write-Host "ERROR: file not found: $Path" -ForegroundColor Red
    exit 1
}

$errors   = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

# --- Encoding checks (byte-level): BOM + CRLF ---
$bytes = [System.IO.File]::ReadAllBytes($Path)
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $warnings.Add("Encoding: file has a UTF-8 BOM (source of truth is no-BOM).")
}
# Detect any bare LF (an LF not immediately preceded by CR) => not pure CRLF.
$hasBareLf = $false
for ($i = 0; $i -lt $bytes.Length; $i++) {
    if ($bytes[$i] -eq 0x0A -and ($i -eq 0 -or $bytes[$i - 1] -ne 0x0D)) { $hasBareLf = $true; break }
}
if ($hasBareLf) {
    $warnings.Add("Encoding: file contains LF line endings (source of truth is CRLF).")
}

# --- Line-by-line format checks ---
$validRel = @('DIRECT', 'RESELLER')
$lines = [System.IO.File]::ReadAllLines($Path)   # splits on CR/LF/CRLF; strips terminators

$total    = $lines.Count
$dataN    = 0
$commentN = 0
$blankN   = 0
$lineNo   = 0

foreach ($raw in $lines) {
    $lineNo++
    $line = $raw.Trim()

    if ($line -eq '')        { $blankN++;   continue }
    if ($line.StartsWith('#')) { $commentN++; continue }

    # Check 1: stray CSV quotes wrapping the line.
    if ($raw.TrimStart().StartsWith('"') -or $raw.TrimEnd().EndsWith('"')) {
        $errors.Add("Line ${lineNo}: wrapped in stray quote(s) -> $raw")
        continue
    }

    $dataN++

    # Check 2: field count (3 or 4). Trim each field to tolerate spaces after commas.
    $fields = $line.Split(',') | ForEach-Object { $_.Trim() }
    if ($fields.Count -lt 3 -or $fields.Count -gt 4) {
        $errors.Add("Line ${lineNo}: expected 3 or 4 fields, got $($fields.Count) -> $line")
        continue
    }
    if ($fields[0] -eq '' -or $fields[1] -eq '') {
        $errors.Add("Line ${lineNo}: empty domain or publisher id -> $line")
        continue
    }

    # Check 4: domain (field 1) should look like a domain (contain a dot).
    # WARN only: a bad field-1 is almost always junk data from the publisher, not
    # a file-format break. Skip the rest of this line's checks (domain is suspect).
    if ($fields[0] -notmatch '\.') {
        $warnings.Add("Line ${lineNo}: domain '$($fields[0])' has no dot (missing TLD / scrambled? likely publisher data) -> $line")
        continue
    }

    # Check 3: relationship field.
    $rel = $fields[2]
    if ($validRel -notcontains $rel) {
        if ($validRel -contains $rel.ToUpperInvariant()) {
            $warnings.Add("Line ${lineNo}: relationship '$rel' has wrong case (expected $($rel.ToUpperInvariant())).")
        } else {
            $errors.Add("Line ${lineNo}: relationship must be DIRECT or RESELLER, got '$rel' -> $line")
        }
    }
}

# --- Optional cross-check against the CSV export ---
if ($CrossCheck) {
    Write-Host ""
    if (-not (Test-Path -LiteralPath $CsvPath)) {
        $warnings.Add("CrossCheck: CSV export not found, skipped -> $CsvPath")
    } else {
        $csvLines = [System.IO.File]::ReadAllLines($CsvPath) | ForEach-Object { $_.Trim('"') }
        if ($csvLines.Count -ne $lines.Count) {
            $errors.Add("CrossCheck: line count differs (app-ads.txt=$($lines.Count), csv=$($csvLines.Count)).")
        }
        $min = [Math]::Min($csvLines.Count, $lines.Count)
        for ($i = 0; $i -lt $min; $i++) {
            if ($csvLines[$i] -ne $lines[$i]) {
                $errors.Add("CrossCheck: line $($i + 1) differs from sheet.`n    txt: $($lines[$i])`n    csv: $($csvLines[$i])")
            }
        }
    }
}

# --- Report ---
Write-Host ""
Write-Host "app-ads.txt verify: $Path"
Write-Host ("  lines total : {0}" -f $total)
Write-Host ("  data        : {0}" -f $dataN)
Write-Host ("  comments    : {0}" -f $commentN)
Write-Host ("  blank       : {0}" -f $blankN)

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "WARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($w in $warnings) { Write-Host "  ! $w" -ForegroundColor Yellow }
}

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "ERRORS ($($errors.Count)):" -ForegroundColor Red
    foreach ($e in $errors) { Write-Host "  x $e" -ForegroundColor Red }
    Write-Host ""
    Write-Host "FAIL" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "PASS" -ForegroundColor Green
exit 0
