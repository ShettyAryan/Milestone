# Deployment Guide - Milestones Clinic Website

Complete guide to deploy both frontend and backend to production.

## Table of Contents
1. [Overview](#overview)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Railway/Render)](#backend-deployment)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Alternative Hosting Options](#alternative-hosting-options)

---

## Overview

**Recommended Stack:**
- **Frontend**: Vercel (free, easy, automatic deployments)
- **Backend**: Railway or Render (free tier available, easy setup)

**Why this combination?**
- ✅ Free tiers available
- ✅ Easy setup and configuration
- ✅ Automatic deployments from Git
- ✅ Built-in SSL certificates
- ✅ Good performance

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Code pushed to GitHub repository

### Step 1: Prepare Frontend

1. **Ensure build works locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Check `frontend/vite.config.ts`** - should be configured correctly

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables** (see [Environment Variables](#environment-variables-setup) section)

6. **Click "Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? milestones-clinic-frontend
# - Directory? ./
# - Override settings? No
```

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

---

## Backend Deployment

### Option 1: Leapcell (Recommended)

See detailed guide: `server/LEAPCELL_DEPLOYMENT.md`

**Quick Steps:**
1. Sign up at [leapcell.io](https://leapcell.io)
2. Create new project from GitHub
3. Set root directory: `server`
4. Start command: `npm start`
5. Add environment variables
6. Deploy and get your backend URL

### Option 2: Railway

#### Step 1: Prepare Backend

1. **Create `server/railway.json`** (optional, for custom config):
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Ensure `server/package.json` has start script:**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "node --watch server.js"
     }
   }
   ```

#### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)** and sign up/login
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**
5. **Configure:**
   - **Root Directory**: `server`
   - **Build Command**: (leave empty, Railway auto-detects)
   - **Start Command**: `npm start`

6. **Add Environment Variables** (see [Environment Variables](#environment-variables-setup) section)

7. **Generate Public URL:**
   - Click on your service
   - Go to "Settings" → "Generate Domain"
   - Copy the URL (e.g., `https://your-app.up.railway.app`)

### Option 2: Render

#### Step 1: Prepare Backend

1. **Create `server/render.yaml`** (optional):
   ```yaml
   services:
     - type: web
       name: milestones-clinic-backend
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
   ```

#### Step 2: Deploy to Render

1. **Go to [render.com](https://render.com)** and sign up/login
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name**: `milestones-clinic-backend`
   - **Environment**: Node
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid)

5. **Add Environment Variables**

6. **Click "Create Web Service"**

---

## Environment Variables Setup

### Frontend Environment Variables (Vercel)

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
# Backend API URL (update after backend is deployed)
VITE_API_BASE_URL=https://your-backend-url.railway.app/api

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

**Important:** After adding variables, **redeploy** your frontend.

### Backend Environment Variables (Railway/Render)

In Railway/Render Dashboard → Your Service → Environment Variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (for CORS) - Update with your Vercel URL
FRONTEND_URL=https://your-frontend.vercel.app

# Google Service Account
# Option 1: JSON file path (if using file upload)
GOOGLE_SERVICE_ACCOUNT_PATH=./service-account.json

# Option 2: JSON as environment variable (RECOMMENDED for production)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your_calendar_id

# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id
```

**For Service Account JSON:**
1. Open your `service-account.json` file
2. Copy the entire JSON content
3. Paste it as a **single line** in the environment variable
4. Make sure all quotes are escaped properly

**Example:**
```json
{"type":"service_account","project_id":"milestones-booking-system","private_key_id":"b6c7d4d8d4e38ba4603413efb9e099bd240d3ee1","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDA0gw+pVeoNpog\n...\n-----END PRIVATE KEY-----\n","client_email":"milestones-booking@milestones-booking-system.iam.gserviceaccount.com",...}
```

---

## Post-Deployment Checklist

### 1. Update Frontend Environment Variables
- [ ] Update `VITE_API_BASE_URL` with your backend URL
- [ ] Redeploy frontend after updating

### 2. Test Backend
- [ ] Visit `https://your-backend-url.railway.app/health`
- [ ] Should return: `{"status":"ok","message":"Milestones Clinic Backend API"}`

### 3. Test Frontend
- [ ] Visit your Vercel URL
- [ ] Navigate to `/book-appointment`
- [ ] Try booking an appointment
- [ ] Check if calendar event is created
- [ ] Check if data is added to Google Sheets

### 4. Update CORS Settings
- [ ] Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
- [ ] Include `https://` and no trailing slash

### 5. Google Services Setup
- [ ] Verify service account has access to Calendar
- [ ] Verify service account has access to Sheets
- [ ] Test calendar event creation
- [ ] Test sheet data append

### 6. EmailJS Setup
- [ ] Configure EmailJS template with booking details
- [ ] Test email sending

---

## Alternative Hosting Options

### Frontend Alternatives

#### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Connect GitHub repo
3. Build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variables
5. Deploy

#### Cloudflare Pages
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repo
3. Build settings similar to Netlify
4. Add environment variables

### Backend Alternatives

#### Heroku
1. Sign up at [heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub
4. Add environment variables
5. Deploy

#### DigitalOcean App Platform
1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Create App
3. Connect GitHub
4. Configure build and start commands
5. Add environment variables

#### AWS/Google Cloud/Azure
- More complex setup
- Requires more configuration
- Better for enterprise needs
- See respective platform documentation

---

## Troubleshooting

### Backend Issues

**Problem:** Backend not starting
- **Solution:** Check logs in Railway/Render dashboard
- Verify `PORT` environment variable
- Ensure `npm start` script exists

**Problem:** CORS errors
- **Solution:** Update `FRONTEND_URL` in backend env vars
- Ensure URL matches exactly (with https://, no trailing slash)
- Redeploy backend after changes

**Problem:** Google API errors
- **Solution:** Verify service account JSON is correct
- Check service account has permissions on Calendar/Sheets
- Ensure Calendar ID and Sheet ID are correct

### Frontend Issues

**Problem:** API calls failing
- **Solution:** Check `VITE_API_BASE_URL` is correct
- Verify backend is running
- Check browser console for errors
- Ensure CORS is configured correctly

**Problem:** Environment variables not working
- **Solution:** Variables must start with `VITE_` for Vite
- Redeploy after adding variables
- Check variable names match exactly

---

## Quick Deploy Commands

### Frontend (Vercel CLI)
```bash
cd frontend
vercel --prod
```

### Backend (Railway CLI)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

## Cost Estimate

### Free Tier (Recommended for Start)
- **Vercel**: Free (unlimited for personal projects)
- **Railway**: $5/month free credit (usually enough for small apps)
- **Render**: Free tier available (with limitations)
- **Total**: $0-5/month

### Paid Tier (For Production)
- **Vercel Pro**: $20/month
- **Railway**: Pay-as-you-go (~$5-20/month)
- **Total**: ~$25-40/month

---

## Security Checklist

- [ ] Never commit `.env` files to Git
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Vercel/Railway)
- [ ] Keep dependencies updated
- [ ] Use strong service account keys
- [ ] Limit CORS to your frontend domain only
- [ ] Enable rate limiting (already configured in backend)

---

## Support

If you encounter issues:
1. Check the logs in your hosting platform dashboard
2. Verify all environment variables are set correctly
3. Test backend health endpoint
4. Check browser console for frontend errors
5. Review this guide's troubleshooting section

---

## Next Steps After Deployment

1. **Set up monitoring** (optional):
   - Use Vercel Analytics
   - Set up error tracking (Sentry)

2. **Configure custom domain** (optional):
   - Add domain in Vercel
   - Update DNS records
   - Update `FRONTEND_URL` in backend

3. **Set up backups**:
   - Google Sheets data is automatically saved
   - Consider exporting calendar events periodically

4. **Performance optimization**:
   - Enable Vercel Edge Functions (if needed)
   - Optimize images
   - Enable caching

---

**Good luck with your deployment! 🚀**

