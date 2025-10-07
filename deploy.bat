@echo off
echo 🚀 SpearAndHammer Quick Deploy
echo ============================

echo 📋 Building and deploying...
powershell -ExecutionPolicy Bypass -File deploy-auto.ps1

echo.
echo 📋 Deployment complete! Choose an option:
echo 1. Push to GitHub and return to main
echo 2. Just return to main (no push)
echo.

set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    echo 📤 Pushing to GitHub...
    powershell -ExecutionPolicy Bypass -File deploy-auto.ps1 -Push
) else (
    echo ✅ Staying local, returning to main...
    git checkout main 2>nul
)

echo.
echo ✅ Done! You can now upload files to cPanel.
pause