# Service Account Setup - Frontend Perspective

## Good News: No Authentication Needed! 🎉

The frontend **does NOT need OAuth anymore**. The backend now uses a Service Account which handles all authentication automatically on the server.

## What This Means

✅ **No "Connect Google Account" button needed**  
✅ **No authentication flow**  
✅ **No tokens to manage**  
✅ **Bookings work immediately**  

The frontend simply calls the backend API, and the backend handles all Google authentication using the Service Account.

## Environment Variables (Frontend)

You still need these in `frontend/.env.local`:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3001/api

# EmailJS (for sending confirmation emails)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: You no longer need:
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CALENDAR_ID` (backend uses its own)
- `VITE_GOOGLE_SHEET_ID` (backend uses its own)

## Backend Setup

The backend needs the Service Account configured. See `../SERVICE_ACCOUNT_SETUP.md` for details.

## What Was Removed

- ❌ `GoogleAuthButton` component (no longer needed)
- ❌ `AuthCallback` page (no longer needed)
- ❌ `authService.ts` (no longer needed)
- ❌ Authentication checks in BookingPage
- ❌ Token management in frontend

## What Still Works

- ✅ Booking form
- ✅ Date and time selection
- ✅ Calendar event creation (via backend)
- ✅ Email notifications (EmailJS)
- ✅ Google Sheets logging (via backend)

## Testing

Just start both servers and book an appointment - no authentication required!

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd frontend
npm run dev
```

That's it! Much simpler now. 🚀

