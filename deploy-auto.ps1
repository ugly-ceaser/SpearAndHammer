# SpearAndHammer Automated Deployment Script
# This script automates the entire deployment process

param(
    [switch]$Push,
    [string]$Message = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "SpearAndHammer Automated Deployment" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Step 1: Ensure we're on main branch
Write-Host "Step 1: Checking current branch..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "Switching to main branch..." -ForegroundColor Yellow
    git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to switch to main branch!" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ On main branch" -ForegroundColor Green

# Step 2: Pull latest changes
Write-Host "📋 Step 2: Pulling latest changes..." -ForegroundColor Yellow
git pull origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Warning: Failed to pull latest changes, continuing..." -ForegroundColor Yellow
}
Write-Host "✅ Latest changes pulled" -ForegroundColor Green

# Step 3: Install dependencies
Write-Host "📋 Step 3: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Step 4: Build the project
Write-Host "📋 Step 4: Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Project built successfully" -ForegroundColor Green

# Step 5: Verify out folder exists
if (!(Test-Path "out")) {
    Write-Host "❌ Static export folder not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Static files generated" -ForegroundColor Green

# Step 6: Create/Update deployment branch
Write-Host "📋 Step 5: Creating deployment branch..." -ForegroundColor Yellow

# Check if deployment branch exists
$deploymentExists = git branch --list deployment
if ($deploymentExists) {
    Write-Host "Switching to existing deployment branch..." -ForegroundColor Yellow
    git checkout deployment
    # Clear existing content
    git rm -rf . 2>$null
    Remove-Item -Recurse -Force * -ErrorAction SilentlyContinue
} else {
    Write-Host "Creating new deployment branch..." -ForegroundColor Yellow
    git checkout --orphan deployment
    git rm -rf . 2>$null
}

# Step 7: Copy static files
Write-Host "📋 Step 6: Copying static files..." -ForegroundColor Yellow
Move-Item out\* . -Force
Remove-Item out -ErrorAction SilentlyContinue

# Remove any development files that might have been copied
$devFiles = @("node_modules", ".next", "next-env.d.ts", "package.json", "package-lock.json", ".gitignore", "README.md")
foreach ($file in $devFiles) {
    if (Test-Path $file) {
        Remove-Item -Recurse -Force $file -ErrorAction SilentlyContinue
    }
}
Write-Host "✅ Static files copied and cleaned" -ForegroundColor Green

# Step 8: Commit changes
Write-Host "📋 Step 7: Committing changes..." -ForegroundColor Yellow
git add .
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to commit changes!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Changes committed" -ForegroundColor Green

# Step 9: Push to GitHub (optional)
if ($Push) {
    Write-Host "📋 Step 8: Pushing to GitHub..." -ForegroundColor Yellow
    git push origin deployment --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to push to GitHub!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Pushed to GitHub" -ForegroundColor Green
}

# Step 10: Show deployment info
Write-Host "📋 Deployment Summary:" -ForegroundColor Cyan
Write-Host "---------------------" -ForegroundColor Cyan
Write-Host "✅ Branch: deployment" -ForegroundColor Green
Write-Host "✅ Commit: $Message" -ForegroundColor Green
Write-Host "✅ Files ready for cPanel upload" -ForegroundColor Green

if ($Push) {
    Write-Host "✅ Pushed to GitHub: https://github.com/ugly-ceaser/SpearAndHammer/tree/deployment" -ForegroundColor Green
} else {
    Write-Host "📤 To push to GitHub: git push origin deployment --force" -ForegroundColor Yellow
}

Write-Host "🌐 Files in deployment branch:" -ForegroundColor Cyan
Get-ChildItem | Where-Object { $_.Name -notlike ".*" } | Select-Object Name, @{Name="Type";Expression={if($_.PSIsContainer){"Directory"}else{"File"}}} | Format-Table -AutoSize

Write-Host "📋 Next Steps for cPanel:" -ForegroundColor Cyan
Write-Host "1. Download all files from this deployment branch" -ForegroundColor White
Write-Host "2. Upload to your cPanel public_html folder" -ForegroundColor White
Write-Host "3. Your website will be live at spearandhammertech.com" -ForegroundColor White

# Return to main branch
Write-Host "📋 Returning to main branch..." -ForegroundColor Yellow
git checkout main
Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green