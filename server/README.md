# Milestones Clinic Backend API

Backend server for handling Google Calendar and Sheets integration using **Service Account** authentication.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in all the values in `.env`:
   - `GOOGLE_SERVICE_ACCOUNT_PATH` - Path to service account JSON file (local development)
   - OR `GOOGLE_SERVICE_ACCOUNT_JSON` - Service account JSON as string (production)
   - `GOOGLE_CALENDAR_ID` - Your calendar ID
   - `GOOGLE_SHEET_ID` - Your sheet ID
   - `FRONTEND_URL` - Your frontend URL (for CORS)
   - `PORT` - Server port (default: 3001)

3. **Service Account Setup:**
   - See `../SERVICE_ACCOUNT_SETUP.md` for detailed instructions
   - Create service account in Google Cloud Console
   - Download JSON key file
   - Share calendar and sheet with service account email
   - Enable Calendar API and Sheets API

4. **Start the server:**
   ```bash
   npm run dev  # Development with auto-reload
   # or
   npm start    # Production
   ```

## API Endpoints

### Calendar

- `POST /api/calendar/events` - Create calendar event
- `GET /api/calendar/events` - Get events (requires timeMin & timeMax query params)
- `GET /api/calendar/availability` - Get available slots for a date

### Sheets

- `POST /api/sheets/append` - Append row to sheet
- `GET /api/sheets/headers` - Check/create sheet headers

## Authentication

This server uses **Google Service Account** for authentication:
- ✅ No user interaction required
- ✅ Automatic authentication on server
- ✅ No OAuth flow needed
- ✅ Credentials never exposed to frontend
- ✅ Perfect for automated operations

All API endpoints work without authentication headers - the server automatically authenticates using the Service Account.

## Security

- Rate limiting: 100 requests per 15 minutes per IP
- CORS configured for frontend domain only
- Service account credentials stay on server only
- Environment variables for all secrets
- Service account JSON file should never be committed to version control

## Production Deployment

1. Set all environment variables in your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Update `GOOGLE_REDIRECT_URI` to your production callback URL
4. Use HTTPS only
5. Consider using a database to store tokens instead of returning them to client

