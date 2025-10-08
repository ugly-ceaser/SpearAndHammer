# PowerShell Deployment Script for SpearAndHammer
# Builds app, manages git branches, and deploys static files

param(
    [string]$BuildCmd = "npm run build",
    [string]$OutDir = "out",
    [string]$MainBranch = "main",
    [string]$StagingBranch = "staging", 
    [string]$DeploymentBranch = "deployment"
)

# Stop on any error
$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "=====" -ForegroundColor Cyan
    Write-Host "===== $Message =====" -ForegroundColor Cyan
    Write-Host "=====" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Yellow
}

try {
    Write-Step "STEP 1: Build the app"
    Write-Info "Running: $BuildCmd"
    Invoke-Expression $BuildCmd
    
    if (!(Test-Path $OutDir)) {
        throw "Build output directory '$OutDir' not found. Build may have failed."
    }
    Write-Success "Build completed successfully"

    Write-Step "STEP 2: Push latest build to $MainBranch"
    git add .
    $commitMessage = "Build and deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $commitMessage
    git push origin $MainBranch
    Write-Success "Pushed to $MainBranch"

    Write-Step "STEP 3: Checkout $StagingBranch and replace it with $MainBranch"
    git checkout $StagingBranch
    git fetch origin
    git reset --hard origin/$MainBranch
    Write-Success "Staging branch updated with main content"

    Write-Step "STEP 4: Remove everything except $OutDir and .git"
    Write-Info "Preserving: $OutDir and .git directory"
    
    # Get all items except .git and out directory
    $itemsToDelete = Get-ChildItem -Force | Where-Object { 
        $_.Name -ne ".git" -and $_.Name -ne $OutDir 
    }
    
    if ($itemsToDelete) {
        $itemsToDelete | Remove-Item -Recurse -Force
        Write-Success "Cleaned up $(($itemsToDelete | Measure-Object).Count) items"
    } else {
        Write-Info "No items to clean up"
    }

    Write-Step "STEP 5: Move contents of $OutDir to root"
    if (Test-Path $OutDir) {
        $outContents = Get-ChildItem -Path $OutDir -Force
        if ($outContents) {
            $outContents | Move-Item -Destination . -Force
            Remove-Item $OutDir -Recurse -Force
            Write-Success "Moved $(($outContents | Measure-Object).Count) items from $OutDir to root"
        } else {
            Write-Info "$OutDir directory is empty"
        }
    } else {
        throw "$OutDir directory not found"
    }

    Write-Step "STEP 6: Commit and push to $StagingBranch"
    git add .
    $stagingCommitMessage = "Deploy build output to staging: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $stagingCommitMessage
    git push origin $StagingBranch --force
    Write-Success "Pushed static files to $StagingBranch"

    Write-Step "STEP 7: Checkout $DeploymentBranch and replace with staging"
    git checkout $DeploymentBranch
    git fetch origin
    git reset --hard origin/$StagingBranch
    git push origin $DeploymentBranch --force
    Write-Success "Deployment branch updated with staging content"

    Write-Host ""
    Write-Host "🎉 ===== DEPLOYMENT COMPLETED SUCCESSFULLY! =====" -ForegroundColor Green
    Write-Host "📋 Summary:" -ForegroundColor White
    Write-Host "   • Built app and pushed to $MainBranch" -ForegroundColor White
    Write-Host "   • Deployed static files to $StagingBranch" -ForegroundColor White
    Write-Host "   • Updated $DeploymentBranch with production files" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Your static site is ready for cPanel upload from the $DeploymentBranch branch" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "❌ DEPLOYMENT FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "   • Check if npm run build completes successfully" -ForegroundColor White
    Write-Host "   • Ensure you have uncommitted changes to commit" -ForegroundColor White
    Write-Host "   • Verify git remote 'origin' is correctly configured" -ForegroundColor White
    Write-Host "   • Make sure you have push access to all branches" -ForegroundColor White
    
    exit 1
}