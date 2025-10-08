# PowerShell Deployment Script
param(
    [string]$BuildCmd = "npm run build",
    [string]$OutDir = "out"
)

$ErrorActionPreference = "Stop"

try {
    Write-Host "===== STEP 1: Build the app =====" -ForegroundColor Cyan
    Invoke-Expression $BuildCmd
    
    if (!(Test-Path $OutDir)) {
        throw "Build output directory not found"
    }
    Write-Host "Build completed successfully" -ForegroundColor Green

    Write-Host "===== STEP 2: Push to main =====" -ForegroundColor Cyan
    git add .
    git commit -m "Build and deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push origin main
    Write-Host "Pushed to main" -ForegroundColor Green

    Write-Host "===== STEP 3: Update staging =====" -ForegroundColor Cyan
    git checkout staging
    git fetch origin
    git reset --hard origin/main
    Write-Host "Staging updated with main content" -ForegroundColor Green

    Write-Host "===== STEP 4: Clean staging =====" -ForegroundColor Cyan
    Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" -and $_.Name -ne $OutDir } | Remove-Item -Recurse -Force
    Write-Host "Cleaned up staging" -ForegroundColor Green

    Write-Host "===== STEP 5: Move build files =====" -ForegroundColor Cyan
    Get-ChildItem -Path $OutDir -Force | Move-Item -Destination . -Force
    Remove-Item $OutDir -Recurse -Force
    Write-Host "Moved build files to root" -ForegroundColor Green

    Write-Host "===== STEP 6: Push staging =====" -ForegroundColor Cyan
    git add .
    git commit -m "Deploy build output: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push origin staging --force
    Write-Host "Pushed to staging" -ForegroundColor Green

    Write-Host "===== STEP 7: Update deployment =====" -ForegroundColor Cyan
    git checkout deployment
    git fetch origin
    git reset --hard origin/staging
    git push origin deployment --force
    Write-Host "Updated deployment branch" -ForegroundColor Green

    Write-Host ""
    Write-Host "DEPLOYMENT COMPLETED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "Your static site is ready for cPanel upload" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "DEPLOYMENT FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}