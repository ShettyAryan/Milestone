# Migration from OAuth to Service Account

## Summary

✅ **OAuth is NO LONGER needed!** The system now uses **Google Service Account** for authentication.

## What Changed

### Backend (`server/`)

#### ✅ Updated Files
- `server/routes/calendar.js` - Now uses Service Account auth (no auth headers needed)
- `server/routes/sheets.js` - Now uses Service Account auth (no auth headers needed)
- `server/server.js` - Removed auth routes import and usage
- `server/README.md` - Updated documentation for Service Account
- `server/.env.example` - Updated with Service Account configuration

#### ❌ No Longer Used (can be deleted)
- `server/routes/auth.js` - OAuth routes no longer needed

### Frontend (`frontend/`)

#### ✅ Updated Files
- `frontend/src/services/googleCalendar.ts` - Removed auth token requirements
- `frontend/src/services/googleSheets.ts` - Removed auth token requirements
- `frontend/src/pages/BookingPage.tsx` - Removed authentication UI and checks
- `frontend/src/App.tsx` - Removed AuthCallback route

#### ❌ No Longer Used (can be deleted)
- `frontend/src/services/authService.ts` - OAuth service no longer needed
- `frontend/src/components/auth/GoogleAuthButton.tsx` - Auth button no longer needed
- `frontend/src/pages/AuthCallback.tsx` - OAuth callback page no longer needed

## Benefits

✅ **Simpler** - No OAuth flow, no tokens, no refresh logic  
✅ **More Secure** - Credentials never exposed to frontend  
✅ **Better UX** - No "Connect Google Account" step for users  
✅ **Automatic** - Authentication happens server-side automatically  
✅ **Production-Ready** - Service Account is industry standard for server-to-server operations  

## Setup Required

1. **Create Service Account** in Google Cloud Console
2. **Download JSON key file**
3. **Share Calendar & Sheet** with service account email
4. **Configure `.env`** with service account path or JSON
5. **Enable APIs** (Calendar API, Sheets API)

See `SERVICE_ACCOUNT_SETUP.md` for detailed instructions.

## Environment Variables

### Backend (`.env`)
```env
# Service Account (one of these)
GOOGLE_SERVICE_ACCOUNT_PATH=./service-account.json
# OR
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Calendar & Sheets
GOOGLE_CALENDAR_ID=your_calendar_id
GOOGLE_SHEET_ID=your_sheet_id

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local`)
```env
# Backend API
VITE_API_BASE_URL=http://localhost:3001/api

# EmailJS (for emails)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## API Changes

### Before (OAuth)
```typescript
// Frontend needed to send auth token
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### After (Service Account)
```typescript
// No auth headers needed - server handles it automatically
const response = await fetch(url, {
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## Testing

1. Start backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Book an appointment - should work immediately without any authentication prompts!

## Cleanup (Optional)

You can safely delete these files if you want:
- `server/routes/auth.js`
- `frontend/src/services/authService.ts`
- `frontend/src/components/auth/GoogleAuthButton.tsx`
- `frontend/src/pages/AuthCallback.tsx`

They won't cause any errors, but they're no longer used.

## Questions?

See `SERVICE_ACCOUNT_SETUP.md` for detailed setup instructions.

