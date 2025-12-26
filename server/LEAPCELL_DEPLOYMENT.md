# Leapcell Backend Deployment Guide

Complete guide to deploy the Milestones Clinic backend to Leapcell.

## Prerequisites

- GitHub account with your code repository
- Leapcell account (sign up at [leapcell.io](https://leapcell.io))
- Google Service Account JSON file ready
- Google Calendar ID and Sheet ID

## Step 1: Prepare Your Backend

### 1.1 Verify Package.json

Ensure your `server/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### 1.2 Check Server Configuration

Your `server.js` should:
- Use `process.env.PORT` (Leapcell sets this automatically)
- Have health check endpoint at `/health`
- Be configured correctly

## Step 2: Deploy to Leapcell

### Option A: Via Leapcell Dashboard (Recommended)

1. **Sign up/Login to Leapcell**
   - Go to [leapcell.io](https://leapcell.io)
   - Sign up or login with GitHub

2. **Create New Project**
   - Click "New Project" or "Create"
   - Select "Deploy from GitHub"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Project Settings**
   - **Project Name**: `milestones-clinic-backend` (or your preferred name)
   - **Root Directory**: `server` ⚠️ **IMPORTANT: Must be set to `server`**
   - **Build Command**: Leave empty (or `npm install` if needed)
   - **Start Command**: `npm start`
   - **Node Version**: Select Node.js 18 or 20 (LTS)
   - **Dockerfile Path**: Leave empty (or `server/Dockerfile` if using custom Dockerfile)
   
   **⚠️ Critical:** Make sure "Root Directory" is set to `server` - this tells Leapcell where your `package.json` is located!

4. **Add Environment Variables**
   - Click on "Environment Variables" or "Config"
   - Add the following variables:

   ```env
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend.vercel.app
   GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
   GOOGLE_CALENDAR_ID=your_calendar_id
   GOOGLE_SHEET_ID=your_sheet_id
   ```

   **Important for Service Account JSON:**
   - Copy entire JSON from `service-account.json`
   - Paste as **single line** (remove line breaks)
   - Ensure all quotes are properly escaped
   - Example format:
     ```json
     {"type":"service_account","project_id":"milestones-booking-system","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...",...}
     ```

5. **Deploy**
   - Click "Deploy" or "Save and Deploy"
   - Wait for deployment to complete
   - Check logs for any errors

6. **Get Your Backend URL**
   - After deployment, Leapcell will provide a URL
   - Format: `https://your-project-name.leapcell.app` or similar
   - Copy this URL for frontend configuration

### Option B: Via Leapcell CLI (If Available)

```bash
# Install Leapcell CLI (if available)
npm install -g @leapcell/cli

# Login
leapcell login

# Deploy
cd server
leapcell deploy
```

## Step 3: Update Frontend

After getting your Leapcell backend URL:

1. **Go to Vercel Dashboard**
2. **Update Environment Variable:**
   - Project → Settings → Environment Variables
   - Update `VITE_API_BASE_URL`:
     ```
     VITE_API_BASE_URL=https://your-backend.leapcell.app/api
     ```
3. **Redeploy Frontend**
   - Trigger a new deployment
   - Or push a commit to trigger auto-deploy

## Step 4: Test Deployment

### 4.1 Test Backend Health
```bash
curl https://your-backend.leapcell.app/health
```

Should return:
```json
{"status":"ok","message":"Milestones Clinic Backend API"}
```

### 4.2 Test from Frontend
1. Visit your frontend URL
2. Go to `/book-appointment`
3. Try booking an appointment
4. Check:
   - ✅ Calendar event created
   - ✅ Data saved to Google Sheets
   - ✅ No CORS errors

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Leapcell may auto-set) | `3001` |
| `FRONTEND_URL` | Your frontend URL for CORS | `https://your-app.vercel.app` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Service account JSON (single line) | `{"type":"service_account",...}` |
| `GOOGLE_CALENDAR_ID` | Google Calendar ID | `primary` or calendar email |
| `GOOGLE_SHEET_ID` | Google Sheet ID | From sheet URL |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` (Leapcell may override) |

## Troubleshooting

### Issue: Backend not starting

**Solution:**
- Check Leapcell logs/deployment logs
- Verify `npm start` script exists in `package.json`
- Ensure Node.js version is compatible (18+)
- Check environment variables are set correctly

### Issue: CORS errors

**Solution:**
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Include `https://` and no trailing slash
- Redeploy backend after updating

### Issue: Google API errors

**Solution:**
- Verify `GOOGLE_SERVICE_ACCOUNT_JSON` is correct (single line)
- Check service account has permissions on Calendar/Sheets
- Verify Calendar ID and Sheet ID are correct
- Check service account email has access

### Issue: Environment variables not working

**Solution:**
- Ensure variable names match exactly (case-sensitive)
- For JSON, ensure it's a single line
- Redeploy after adding/updating variables
- Check logs for variable loading errors

### Issue: Port conflicts

**Solution:**
- Leapcell usually sets PORT automatically
- Use `process.env.PORT || 3001` in your code (already done)
- Don't hardcode port numbers

## Leapcell-Specific Notes

1. **Auto-scaling**: Leapcell may auto-scale based on traffic
2. **HTTPS**: Automatically enabled
3. **Custom Domain**: Can be configured in Leapcell settings
4. **Logs**: Available in Leapcell dashboard
5. **Environment Variables**: Set in project settings
6. **Deployments**: Automatic on git push (if configured)

## Updating Deployment

### Automatic Updates
- If connected to GitHub, pushes to main branch trigger auto-deploy
- Check Leapcell settings for auto-deploy configuration

### Manual Updates
1. Go to Leapcell dashboard
2. Find your project
3. Click "Redeploy" or "Deploy"

## Monitoring

### Check Logs
- Leapcell Dashboard → Your Project → Logs
- Monitor for errors or issues
- Check deployment logs for build errors

### Health Monitoring
- Set up health check endpoint monitoring (if available)
- Monitor `/health` endpoint
- Set up alerts for downtime (if available)

## Cost Information

- Check Leapcell pricing at [leapcell.io/pricing](https://leapcell.io/pricing)
- Free tier may be available
- Monitor usage in dashboard

## Security Checklist

- [ ] All environment variables set (not hardcoded)
- [ ] Service account JSON is secure
- [ ] CORS limited to frontend domain
- [ ] HTTPS enabled (automatic)
- [ ] Rate limiting active (already configured)
- [ ] No sensitive data in code

## Next Steps

1. ✅ Deploy backend to Leapcell
2. ✅ Get backend URL
3. ✅ Update frontend `VITE_API_BASE_URL`
4. ✅ Test full booking flow
5. ✅ Monitor logs for any issues
6. ✅ Set up custom domain (optional)

## Support

- Leapcell Documentation: [docs.leapcell.io](https://docs.leapcell.io)
- Check Leapcell dashboard for support options
- Review deployment logs for specific errors

---

**Your backend URL will be:**
```
https://your-project-name.leapcell.app
```

**API endpoints:**
- Health: `https://your-project-name.leapcell.app/health`
- Calendar: `https://your-project-name.leapcell.app/api/calendar/*`
- Sheets: `https://your-project-name.leapcell.app/api/sheets/*`

