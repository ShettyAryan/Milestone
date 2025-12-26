# Leapcell Troubleshooting Guide

## Common Errors and Solutions

### Error: "Could not read package.json: ENOENT: no such file or directory"

**Cause:** Leapcell is looking for `package.json` in the wrong directory.

**Solution:**
1. Go to Leapcell Dashboard → Your Project → Settings
2. Check **"Root Directory"** setting
3. It should be set to: `server` (not empty, not `/server`, just `server`)
4. Save and redeploy

**Why this happens:**
- By default, Leapcell builds from repository root
- Your `package.json` is in `server/` subdirectory
- Setting Root Directory tells Leapcell where to look

### Error: "npm install failed" or "Dependencies not found"

**Solution:**
1. Verify `server/package.json` exists and is valid JSON
2. Check that all dependencies are listed in `package.json`
3. Ensure Node.js version is 18+ (check in Leapcell settings)
4. Try setting Build Command to: `npm install` (if not already set)

### Error: "Port already in use" or "EADDRINUSE"

**Solution:**
- This shouldn't happen if you're using `process.env.PORT`
- Verify your code uses: `const PORT = process.env.PORT || 3001;`
- **Don't** set PORT in environment variables (Leapcell sets it automatically)

### Error: "Module not found" or Import errors

**Solution:**
1. Check that all dependencies are in `package.json` (not just `devDependencies`)
2. Ensure `package.json` has correct `"type": "module"` if using ES modules
3. Verify import paths are correct (relative paths, not absolute)
4. Check that all files are in the `server/` directory

### Error: "CORS policy" or "Access-Control-Allow-Origin"

**Solution:**
1. Check `FRONTEND_URL` environment variable is set correctly
2. Ensure it matches your Vercel URL exactly (with `https://`, no trailing slash)
3. Example: `https://your-app.vercel.app` (not `https://your-app.vercel.app/`)
4. Redeploy backend after updating

### Error: "Google Service Account not configured"

**Solution:**
1. Verify `GOOGLE_SERVICE_ACCOUNT_JSON` is set in environment variables
2. Ensure JSON is on **single line** (no line breaks)
3. Check that all quotes are properly escaped
4. Verify JSON is valid (test with JSON validator)
5. Don't use `GOOGLE_SERVICE_ACCOUNT_PATH` in production (use JSON env var)

### Error: Build succeeds but app doesn't start

**Solution:**
1. Check logs in Leapcell dashboard
2. Verify `npm start` script exists in `package.json`
3. Check that `server.js` is the entry point
4. Look for runtime errors in logs
5. Test health endpoint: `https://your-app.leapcell.app/health`

### Error: "Cannot find module" at runtime

**Solution:**
1. Ensure all dependencies are in `dependencies` (not `devDependencies`)
2. Check that `node_modules` is not in `.gitignore` (Leapcell will install)
3. Verify import paths use correct file extensions (`.js`, `.ts`, etc.)
4. Check that all required files are in the `server/` directory

## Configuration Checklist

Before deploying, verify:

- [ ] **Root Directory** is set to `server` in Leapcell settings
- [ ] `server/package.json` exists and is valid
- [ ] `server/server.js` exists (or your main file)
- [ ] `npm start` script is defined in `package.json`
- [ ] All environment variables are set
- [ ] Node.js version is 18+ in Leapcell settings
- [ ] No hardcoded ports (using `process.env.PORT`)

## Debugging Steps

### 1. Check Build Logs
- Go to Leapcell Dashboard → Your Project → Logs
- Look for errors during build phase
- Check for missing files or dependencies

### 2. Check Runtime Logs
- View application logs in Leapcell dashboard
- Look for startup errors
- Check for runtime exceptions

### 3. Test Locally First
```bash
cd server
npm install
npm start
```
If it works locally, it should work on Leapcell (with correct Root Directory)

### 4. Verify File Structure
Your `server/` directory should have:
```
server/
  ├── package.json       ← Must exist
  ├── server.js          ← Main entry point
  ├── routes/
  │   ├── calendar.js
  │   └── sheets.js
  └── ...
```

### 5. Check Environment Variables
- Verify all required variables are set
- Check for typos in variable names
- Ensure values are correct (especially JSON format)

## Still Having Issues?

1. **Check Leapcell Documentation**: [docs.leapcell.io](https://docs.leapcell.io)
2. **Review Build Logs**: Look for specific error messages
3. **Test Locally**: Ensure it works on your machine first
4. **Verify Configuration**: Double-check all settings in Leapcell dashboard
5. **Contact Support**: Use Leapcell support channels

## Quick Fixes

### Fix Root Directory Issue
```bash
# In Leapcell Dashboard:
Settings → Root Directory → Set to: server
Save → Redeploy
```

### Fix Missing Dependencies
```bash
# Add to package.json if missing:
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "googleapis": "^126.0.1",
    "express-rate-limit": "^7.1.5"
  }
}
```

### Fix PORT Issue
```javascript
// In server.js (already correct):
const PORT = process.env.PORT || 3001;
// Don't set PORT in env vars - Leapcell does this automatically
```

---

**Most Common Issue:** Root Directory not set to `server` - this causes 90% of deployment failures!

