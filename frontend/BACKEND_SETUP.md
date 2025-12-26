# Backend API Setup Guide

The backend API handles Google OAuth authentication and provides secure endpoints for Calendar and Sheets operations.

## Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create `server/.env` file:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

# Google Resources
GOOGLE_CALENDAR_ID=your_calendar_id
GOOGLE_SHEET_ID=your_sheet_id

# Session Secret (generate random string)
SESSION_SECRET=your_random_secret_here
```

### 3. Update Frontend Environment Variables

Add to your frontend `.env.local`:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3001/api
```

### 4. Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:3001`

### 5. Start Frontend (in another terminal)

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:all
```

## Google Cloud Console Setup

### 1. OAuth Redirect URI

In Google Cloud Console → Credentials → OAuth 2.0 Client:
- Add authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
- For production: `https://yourdomain.com/api/auth/google/callback`

### 2. Required Scopes

The OAuth consent screen needs these scopes:
- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/spreadsheets`

## API Endpoints

### Authentication

- `GET /api/auth/google` - Get OAuth URL
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/verify` - Verify token

### Calendar

- `POST /api/calendar/events` - Create event
- `GET /api/calendar/events?timeMin=...&timeMax=...` - Get events
- `GET /api/calendar/availability?date=YYYY-MM-DD` - Get available slots

### Sheets

- `POST /api/sheets/append` - Append row
- `GET /api/sheets/headers` - Check/create headers

## Authentication Flow

1. User clicks "Connect Google Account" button
2. Frontend calls `GET /api/auth/google` to get auth URL
3. User is redirected to Google OAuth
4. Google redirects to `/api/auth/google/callback` with code
5. Backend exchanges code for tokens
6. Tokens returned to frontend and stored in localStorage
7. Frontend includes `Authorization: Bearer <token>` in API calls

## Testing

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev`
3. Navigate to booking page
4. Click "Connect Google Account" if not authenticated
5. Complete OAuth flow
6. Try booking an appointment

## Production Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set all environment variables in hosting platform
2. Update `FRONTEND_URL` to production domain
3. Update `GOOGLE_REDIRECT_URI` to production callback URL
4. Deploy backend

### Frontend Deployment

1. Update `VITE_API_BASE_URL` to production backend URL
2. Deploy frontend

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure `SESSION_SECRET`
- [ ] Configure CORS properly
- [ ] Rate limiting enabled
- [ ] Environment variables secured
- [ ] Consider using database for token storage instead of localStorage

## Troubleshooting

### "CORS error"
→ Check `FRONTEND_URL` in backend `.env` matches your frontend URL

### "Invalid redirect URI"
→ Verify redirect URI in Google Cloud Console matches backend callback URL

### "Token expired"
→ Tokens auto-refresh, but ensure refresh_token is stored

### "401 Unauthorized"
→ User needs to authenticate first via OAuth flow

