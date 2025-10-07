# SpearAndHammer Simple Deployment Script
param(
    [switch]$Push,
    [string]$Message = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "SpearAndHammer Deployment Starting..." -ForegroundColor Green

# Step 1: Switch to main branch
Write-Host "Step 1: Switching to main branch..." -ForegroundColor Yellow
git checkout main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to switch to main branch!" -ForegroundColor Red
    exit 1
}

# Step 2: Install dependencies
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

# Step 3: Build project
Write-Host "Step 3: Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Step 4: Check out folder
if (!(Test-Path "out")) {
    Write-Host "Out folder not found!" -ForegroundColor Red
    exit 1
}

# Step 5: Create deployment branch
Write-Host "Step 4: Creating deployment branch..." -ForegroundColor Yellow
$deploymentExists = git branch --list deployment
if ($deploymentExists) {
    git checkout deployment
    git rm -rf . 2>$null
} else {
    git checkout --orphan deployment
    git rm -rf . 2>$null
}

# Step 6: Copy static files
Write-Host "Step 5: Copying static files..." -ForegroundColor Yellow
Move-Item out\* . -Force
Remove-Item out -ErrorAction SilentlyContinue

# Remove dev files
$devFiles = @("node_modules", ".next", "next-env.d.ts", "package.json", "package-lock.json")
foreach ($file in $devFiles) {
    if (Test-Path $file) {
        Remove-Item -Recurse -Force $file -ErrorAction SilentlyContinue
    }
}

# Step 7: Commit
Write-Host "Step 6: Committing changes..." -ForegroundColor Yellow
git add .
git commit -m $Message

# Step 8: Push if requested
if ($Push) {
    Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Yellow
    git push origin deployment --force
    Write-Host "Pushed to GitHub successfully!" -ForegroundColor Green
}

# Step 9: Return to main
Write-Host "Step 8: Returning to main branch..." -ForegroundColor Yellow
git checkout main

Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "Files are ready in the deployment branch for cPanel upload." -ForegroundColor Cyan