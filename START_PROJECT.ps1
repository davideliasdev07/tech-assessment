
# Web3 Game - Complete Startup Script (PowerShell)
# This script starts both the server and client with Node 20

Write-Host "========================================"
Write-Host "  Web3 Game - Startup"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set up Node 20 path
$node20Path = 'C:\temp\node-v20.14.0-win-x64\bin'
if (Test-Path $node20Path) {
    $env:PATH = "$node20Path;$($env:PATH)"
    Write-Host "✓ Using Node 20 LTS" -ForegroundColor Green
} else {
    Write-Host "⚠ Node 20 not found at $node20Path" -ForegroundColor Yellow
    Write-Host "  Make sure Node 20 LTS is installed" -ForegroundColor Yellow
}

# Verify Node version
Write-Host "Node version:" -ForegroundColor Cyan
node --version
npm --version
Write-Host ""

# Kill any existing process on port 9208
Write-Host "Cleaning up old processes on port 9208..."
$processes = Get-Process node -ErrorAction SilentlyContinue | Where-Object {$_.CommandLine -like "*9208*"}
if ($processes) {
    $processes | Stop-Process -Force
    Write-Host "✓ Old processes stopped" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================"
Write-Host "  Starting Server on port 9208"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start server in a new window
$serverScript = @"
cd '$PSScriptRoot\server'
npm run server
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $serverScript -WindowStyle Normal

# Wait for server to start
Start-Sleep -Seconds 3

Write-Host "========================================"
Write-Host "  Starting Client on port 3000"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start client in a new window
$clientScript = @"
cd '$PSScriptRoot\client'
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $clientScript -WindowStyle Normal

Write-Host ""
Write-Host "========================================"
Write-Host "  Startup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server: http://localhost:9208"
Write-Host "Client: http://localhost:3000"
Write-Host ""
Write-Host "Open your browser to: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
