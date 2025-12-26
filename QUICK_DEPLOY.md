# Quick Deployment Guide

Fastest way to get your website live in 15 minutes.

## 🚀 Quick Start

### Frontend → Vercel (5 minutes)

1. **Push code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click "Deploy"

3. **Add Environment Variables** (after backend is deployed):
   - Go to Project → Settings → Environment Variables
   - Add:
     ```
     VITE_API_BASE_URL=https://your-backend-url.railway.app/api
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - Redeploy

### Backend → Railway (10 minutes)

1. **Prepare Service Account JSON:**
   - Open `server/service-account.json`
   - Copy entire content
   - Convert to single line (remove line breaks in private_key)

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repo
   - **Root Directory**: `server`
   - **Start Command**: `npm start`

3. **Add Environment Variables:**
   - Click on your service → Variables
   - Add all variables from `server/.env.local`
   - **Important**: For `GOOGLE_SERVICE_ACCOUNT_JSON`, paste the entire JSON as one line
   - Update `FRONTEND_URL` with your Vercel URL

4. **Get Backend URL:**
   - Railway → Settings → Generate Domain
   - Copy the URL (e.g., `https://your-app.up.railway.app`)

5. **Update Frontend:**
   - Go back to Vercel
   - Update `VITE_API_BASE_URL` with Railway URL
   - Redeploy frontend

## ✅ Test

1. Visit your Vercel URL
2. Go to `/book-appointment`
3. Try booking an appointment
4. Check:
   - ✅ Calendar event created
   - ✅ Data in Google Sheets
   - ✅ Email sent (if EmailJS configured)

## 🆘 Common Issues

**Backend not starting?**
- Check Railway logs
- Verify `PORT` is set (Railway auto-sets, but check anyway)

**CORS errors?**
- Ensure `FRONTEND_URL` in backend matches Vercel URL exactly
- Include `https://` and no trailing slash

**Google API errors?**
- Verify service account JSON is correct (single line)
- Check service account has access to Calendar/Sheets

**Frontend can't connect to backend?**
- Check `VITE_API_BASE_URL` is correct
- Ensure backend is running (check Railway logs)
- Test backend health: `https://your-backend-url.railway.app/health`

## 📝 Environment Variables Checklist

### Backend (Railway)
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL=https://your-frontend.vercel.app`
- [ ] `GOOGLE_SERVICE_ACCOUNT_JSON={...}` (single line JSON)
- [ ] `GOOGLE_CALENDAR_ID=your_calendar_id`
- [ ] `GOOGLE_SHEET_ID=your_sheet_id`

### Frontend (Vercel)
- [ ] `VITE_API_BASE_URL=https://your-backend.railway.app/api`
- [ ] `VITE_EMAILJS_SERVICE_ID=...`
- [ ] `VITE_EMAILJS_TEMPLATE_ID=...`
- [ ] `VITE_EMAILJS_PUBLIC_KEY=...`

## 🎉 Done!

Your website should now be live! Share your Vercel URL with users.

For detailed instructions, see `DEPLOYMENT_GUIDE.md`

