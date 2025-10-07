# SpearAndHammer Deployment Scripts

This repository contains automated deployment scripts to streamline the process of building and deploying your Next.js static site.

## 🚀 Quick Start

### Option 1: Simple Batch Script (Recommended)
```bash
.\deploy.bat
```
- Interactive menu
- Handles everything automatically
- Choose whether to push to GitHub

### Option 2: PowerShell Script (Advanced)
```bash
# Basic deployment (local only)
.\deploy-auto.ps1

# Deploy and push to GitHub
.\deploy-auto.ps1 -Push

# Deploy with custom commit message
.\deploy-auto.ps1 -Push -Message "Updated contact page"
```

## 📋 What the Scripts Do

1. **✅ Switch to main branch** - Ensures you're on the correct branch
2. **✅ Pull latest changes** - Gets the most recent code
3. **✅ Install dependencies** - Runs `npm install`
4. **✅ Build project** - Runs `npm run build` 
5. **✅ Create deployment branch** - Creates clean `deployment` branch
6. **✅ Copy static files** - Moves only production files
7. **✅ Clean unwanted files** - Removes `node_modules`, dev files
8. **✅ Commit changes** - Commits with timestamp
9. **✅ Push to GitHub** (optional) - Uploads to repository
10. **✅ Return to main** - Switches back to development branch

## 🌐 Deployment Branch Contents

The `deployment` branch contains ONLY these files:
- ✅ `index.html`, `about.html`, etc. (your pages)
- ✅ `_next/static/` (optimized CSS/JS)
- ✅ `bg/`, `icons/`, `team/` (images)
- ✅ `favicon.ico`

**What's NOT included:**
- ❌ `node_modules/` 
- ❌ `src/` source code
- ❌ `package.json`
- ❌ Development files

## 📤 cPanel Deployment

1. Run the deployment script
2. Switch to `deployment` branch (script does this automatically)
3. Download all files from the branch
4. Upload to your cPanel `public_html` folder
5. Your site is live at `spearandhammertech.com`

## 🔧 Manual Commands

If you prefer manual control:

```bash
# Build project
npm run build

# Create deployment branch
git checkout --orphan deployment
git rm -rf .
move out\* .
git add .
git commit -m "Deploy: $(date)"

# Push to GitHub
git push origin deployment --force

# Return to main
git checkout main
```

## ⚠️ Important Notes

- Always commit your changes to `main` branch before deploying
- The deployment branch is automatically cleaned each time
- Only static files are deployed (no server-side code)
- The script returns you to `main` branch when finished

## 🆘 Troubleshooting

**Build fails?**
- Check for TypeScript/ESLint errors
- Run `npm install` manually
- Fix code issues in `main` branch

**Git errors?**
- Ensure you're in the project directory
- Check your Git configuration
- Make sure you have push permissions

**Files missing?**
- Verify the `out/` folder exists after build
- Check Next.js export configuration
- Ensure all assets are in `public/` folder