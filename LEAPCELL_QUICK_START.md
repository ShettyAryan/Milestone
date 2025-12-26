# Leapcell Backend - Quick Start

Fastest way to deploy your backend to Leapcell in 5 minutes.

## 🚀 Quick Steps

### 1. Sign Up & Create Project (2 minutes)

1. Go to [leapcell.io](https://leapcell.io)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository

### 2. Configure Project (1 minute)

**Settings:**
- **Root Directory**: `server` ⚠️ **CRITICAL: Must be exactly `server`**
- **Start Command**: `npm start`
- **Node Version**: 18 or 20 (LTS)
- **Build Command**: Leave empty (or `npm install`)
- **Dockerfile Path**: Leave empty (unless using custom Dockerfile)

**⚠️ Important:** The "Root Directory" setting is crucial - it tells Leapcell where to find your `package.json`. If this is wrong, you'll get "package.json not found" errors.

### 3. Add Environment Variables (2 minutes)

Click "Environment Variables" and add:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...",...}
GOOGLE_CALENDAR_ID=your_calendar_id
GOOGLE_SHEET_ID=your_sheet_id
```

**Important:**
- `GOOGLE_SERVICE_ACCOUNT_JSON` must be **single line**
- Copy entire JSON from `service-account.json`
- Remove line breaks in private_key section
- Update `FRONTEND_URL` with your Vercel URL

### 4. Deploy & Get URL

1. Click "Deploy" or "Save and Deploy"
2. Wait for deployment (usually 1-2 minutes)
3. Copy your backend URL: `https://your-project.leapcell.app`

### 5. Update Frontend

1. Go to Vercel Dashboard
2. Update `VITE_API_BASE_URL`:
   ```
   https://your-project.leapcell.app/api
   ```
3. Redeploy frontend

## ✅ Test

```bash
# Test health endpoint
curl https://your-project.leapcell.app/health

# Should return:
# {"status":"ok","message":"Milestones Clinic Backend API"}
```

## 🆘 Troubleshooting

**Backend not starting?**
- Check Leapcell logs
- Verify `npm start` exists in `package.json`
- Check Node.js version (18+)

**CORS errors?**
- Verify `FRONTEND_URL` matches Vercel URL exactly
- Include `https://` and no trailing slash

**Google API errors?**
- Check service account JSON format (single line)
- Verify service account has Calendar/Sheets access

## 📝 Environment Variables Checklist

- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL=https://your-frontend.vercel.app`
- [ ] `GOOGLE_SERVICE_ACCOUNT_JSON={...}` (single line)
- [ ] `GOOGLE_CALENDAR_ID=...`
- [ ] `GOOGLE_SHEET_ID=...`

## 📚 Full Guide

For detailed instructions, see: `server/LEAPCELL_DEPLOYMENT.md`

---

**Your backend will be live at:**
```
https://your-project.leapcell.app
```

**API endpoints:**
- Health: `/health`
- Calendar: `/api/calendar/*`
- Sheets: `/api/sheets/*`

