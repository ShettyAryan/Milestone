# Quick Fix: Create .env File

## The Problem
The error "Google Service Account not configured" means your `.env` file is missing or incomplete.

## Solution

1. **Create a file named `.env` in the `server/` directory**

2. **Add these lines to the file:**

```env
# Google Service Account Configuration
GOOGLE_SERVICE_ACCOUNT_PATH=./service-account.json

# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your_calendar_id_here

# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

3. **Replace the placeholder values:**
   - `your_calendar_id_here` → Your actual Google Calendar ID
   - `your_sheet_id_here` → Your actual Google Sheet ID

## How to Find Calendar ID

1. Go to [Google Calendar](https://calendar.google.com/)
2. Click on your calendar → **Settings and sharing**
3. Scroll down to **Integrate calendar**
4. Copy the **Calendar ID** (usually your email or a long string)

## How to Find Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the `SHEET_ID_HERE` part

## After Creating .env

1. **Restart your server** (stop and start again)
2. The error should be gone!

## Important Notes

- ✅ The `.env` file is gitignored (won't be committed to git)
- ✅ `service-account.json` is already in the `server/` directory
- ✅ The path `./service-account.json` is relative to the `server/` directory
- ⚠️ Make sure the calendar and sheet are shared with the service account email:
  - `milestones-booking@milestones-booking-system.iam.gserviceaccount.com`

