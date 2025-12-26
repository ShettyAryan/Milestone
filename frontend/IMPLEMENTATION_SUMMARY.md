# Backend Authentication Implementation Summary

## ✅ What Has Been Implemented

### Backend Server (`/server`)

1. **Express Server** (`server.js`)
   - CORS configured for frontend
   - Rate limiting (100 requests per 15 minutes)
   - Error handling middleware
   - Health check endpoint

2. **Authentication Routes** (`routes/auth.js`)
   - `GET /api/auth/google` - Get OAuth authorization URL
   - `GET /api/auth/google/callback` - Handle OAuth callback
   - `POST /api/auth/refresh` - Refresh access token
   - `POST /api/auth/verify` - Verify token validity

3. **Calendar Routes** (`routes/calendar.js`)
   - `POST /api/calendar/events` - Create calendar event
   - `GET /api/calendar/events` - Get events for date range
   - `GET /api/calendar/availability` - Get available time slots

4. **Sheets Routes** (`routes/sheets.js`)
   - `POST /api/sheets/append` - Append booking to sheet
   - `GET /api/sheets/headers` - Check/create sheet headers

### Frontend Updates

1. **Authentication Service** (`src/services/authService.ts`)
   - OAuth flow management
   - Token storage and retrieval
   - Token refresh logic
   - Token verification

2. **Updated Services**
   - `googleCalendar.ts` - Now uses backend API
   - `googleSheets.ts` - Now uses backend API

3. **Google Auth Button** (`src/components/auth/GoogleAuthButton.tsx`)
   - OAuth popup flow
   - Token storage
   - Success callback

4. **Booking Page** (`src/pages/BookingPage.tsx`)
   - Authentication status check
   - Auth button display when not authenticated

## 📋 Setup Required

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
   GOOGLE_CALENDAR_ID=your_calendar_id
   GOOGLE_SHEET_ID=your_sheet_id
   SESSION_SECRET=random_string_here
   ```

3. **Start backend:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Add to `.env.local`:**
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

2. **Install concurrently (optional, for running both):**
   ```bash
   npm install --save-dev concurrently
   ```

3. **Start frontend:**
   ```bash
   npm run dev
   ```

### Google Cloud Console

1. **Update OAuth Redirect URI:**
   - Add: `http://localhost:3001/api/auth/google/callback`
   - For production: `https://yourdomain.com/api/auth/google/callback`

2. **Verify Scopes:**
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/spreadsheets`

## 🔄 Authentication Flow

1. User visits booking page
2. If not authenticated, sees "Connect Google Account" button
3. Clicks button → Frontend calls `GET /api/auth/google`
4. Backend returns OAuth URL
5. Popup opens with Google OAuth
6. User authorizes → Google redirects to callback
7. Backend exchanges code for tokens
8. Tokens returned to frontend
9. Frontend stores tokens in localStorage
10. All subsequent API calls include `Authorization: Bearer <token>`

## 🚀 Running the Application

### Option 1: Run Separately

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

### Option 2: Run Together

```bash
npm run dev:all
```

## 📝 API Usage Examples

### Create Calendar Event
```javascript
POST /api/calendar/events
Headers: { Authorization: "Bearer <token>" }
Body: {
  summary: "Appointment...",
  description: "...",
  startDateTime: "2024-01-15T09:00:00Z",
  endDateTime: "2024-01-15T09:30:00Z",
  attendeeEmail: "parent@example.com",
  attendeeName: "Parent Name"
}
```

### Get Available Slots
```javascript
GET /api/calendar/availability?date=2024-01-15
Headers: { Authorization: "Bearer <token>" }
```

### Append to Sheet
```javascript
POST /api/sheets/append
Headers: { Authorization: "Bearer <token>" }
Body: {
  values: ["timestamp", "booking_id", "parent", ...]
}
```

## 🔒 Security Features

- ✅ OAuth tokens never exposed in frontend code
- ✅ Rate limiting on all endpoints
- ✅ CORS configured for specific frontend domain
- ✅ Token refresh mechanism
- ✅ Token verification before use
- ✅ Error handling and logging

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify all environment variables are set
- Check `node_modules` are installed

### OAuth fails
- Verify redirect URI matches Google Cloud Console
- Check client ID and secret are correct
- Ensure scopes are approved in OAuth consent screen

### API calls fail with 401
- User needs to authenticate first
- Token may be expired (auto-refresh should handle this)
- Check token is being sent in Authorization header

### CORS errors
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check browser console for specific CORS error

## 📚 Next Steps

1. **Test the flow:**
   - Start backend and frontend
   - Navigate to booking page
   - Authenticate with Google
   - Book an appointment

2. **Production Deployment:**
   - Deploy backend to hosting platform (Railway, Render, Heroku)
   - Update environment variables
   - Deploy frontend
   - Update OAuth redirect URIs

3. **Optional Enhancements:**
   - Add database for token storage
   - Implement user sessions
   - Add admin dashboard
   - Email notifications for admins

## 📖 Documentation Files

- `BACKEND_SETUP.md` - Detailed backend setup guide
- `server/README.md` - Backend API documentation
- `SETUP.md` - Original setup guide (still relevant)
- `ENV_CHECKLIST.md` - Environment variables checklist

