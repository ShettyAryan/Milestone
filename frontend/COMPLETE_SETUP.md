# Complete Setup Guide - Backend Authentication

## ✅ Implementation Complete

The backend authentication system has been fully implemented. Here's what you need to do:

## 📋 Step-by-Step Setup

### 1. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

GOOGLE_CALENDAR_ID=your_calendar_id
GOOGLE_SHEET_ID=your_sheet_id

SESSION_SECRET=generate_random_string_here
```

### 2. Frontend Setup

Add to your frontend `.env.local`:
```env
# Existing variables
VITE_GOOGLE_CALENDAR_ID=your_calendar_id
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# NEW: Backend API URL
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Google Cloud Console

**Update OAuth Redirect URI:**
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add authorized redirect URI:
   - Development: `http://localhost:3001/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`

### 4. Install Frontend Dependencies

```bash
npm install --save-dev concurrently
```

### 5. Start Everything

**Option A: Run separately**
```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
npm run dev
```

**Option B: Run together**
```bash
npm run dev:all
```

## 🔄 How It Works

1. User visits `/book-appointment`
2. If not authenticated, sees "Connect Google Account" button
3. Clicks button → Redirects to Google OAuth
4. User authorizes → Google redirects to backend callback
5. Backend exchanges code for tokens
6. Backend redirects to frontend `/auth/callback` with tokens
7. Frontend stores tokens in localStorage
8. User can now book appointments

## 📝 Environment Variables Summary

### Backend (`server/.env`)
- `PORT` - Backend port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS
- `GOOGLE_CLIENT_ID` - OAuth client ID
- `GOOGLE_CLIENT_SECRET` - OAuth client secret
- `GOOGLE_REDIRECT_URI` - OAuth callback URL
- `GOOGLE_CALENDAR_ID` - Calendar ID
- `GOOGLE_SHEET_ID` - Sheet ID
- `SESSION_SECRET` - Random string for sessions

### Frontend (`.env.local`)
- `VITE_API_BASE_URL` - Backend API URL (NEW)
- `VITE_GOOGLE_CALENDAR_ID` - Calendar ID (optional, backend uses its own)
- `VITE_GOOGLE_SHEET_ID` - Sheet ID (optional, backend uses its own)
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

## ✅ Testing Checklist

1. [ ] Backend starts without errors
2. [ ] Frontend starts without errors
3. [ ] Can access `/book-appointment` page
4. [ ] "Connect Google Account" button appears
5. [ ] Clicking button redirects to Google
6. [ ] After authorization, redirects back
7. [ ] Tokens are stored in localStorage
8. [ ] Can select date and see available slots
9. [ ] Can submit booking form
10. [ ] Calendar event is created
11. [ ] Email is sent
12. [ ] Sheet row is added

## 🐛 Troubleshooting

### Backend won't start
- Check port 3001 is available
- Verify all `.env` variables are set
- Check `node_modules` installed

### OAuth redirect fails
- Verify redirect URI in Google Cloud Console
- Check `GOOGLE_REDIRECT_URI` matches exactly
- Ensure OAuth consent screen is configured

### "401 Unauthorized" errors
- User needs to authenticate first
- Check tokens in localStorage
- Verify token hasn't expired

### CORS errors
- Check `FRONTEND_URL` in backend `.env`
- Verify it matches your frontend URL exactly

## 🚀 Production Deployment

1. **Deploy Backend** (Railway, Render, Heroku, etc.)
   - Set all environment variables
   - Update `FRONTEND_URL` to production domain
   - Update `GOOGLE_REDIRECT_URI` to production callback

2. **Deploy Frontend**
   - Set `VITE_API_BASE_URL` to production backend URL
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, etc.

3. **Update Google Cloud Console**
   - Add production redirect URI
   - Update authorized JavaScript origins

## 📚 Files Created

### Backend
- `server/server.js` - Main server
- `server/routes/auth.js` - Authentication routes
- `server/routes/calendar.js` - Calendar API
- `server/routes/sheets.js` - Sheets API
- `server/package.json` - Backend dependencies

### Frontend
- `src/services/authService.ts` - Auth service
- `src/components/auth/GoogleAuthButton.tsx` - Auth button
- `src/pages/AuthCallback.tsx` - OAuth callback handler
- Updated `src/services/googleCalendar.ts` - Uses backend
- Updated `src/services/googleSheets.ts` - Uses backend
- Updated `src/pages/BookingPage.tsx` - Auth integration

### Documentation
- `BACKEND_SETUP.md` - Detailed backend guide
- `IMPLEMENTATION_SUMMARY.md` - Implementation overview
- `COMPLETE_SETUP.md` - This file

## 🎉 You're All Set!

The backend authentication system is complete. Follow the steps above to get it running!

