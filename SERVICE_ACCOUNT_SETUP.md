# Service Account Setup Guide

OAuth is **NOT needed** anymore! We're using a **Service Account** instead, which is simpler and more secure for server-to-server operations.

## Why Service Account Instead of OAuth?

✅ **No user interaction required** - Authentication happens automatically  
✅ **More secure** - Credentials stay on the server, never exposed to frontend  
✅ **Simpler setup** - No OAuth flow, tokens, or refresh logic needed  
✅ **Perfect for automated operations** - Ideal for clinic calendar and sheets  

## Setup Steps

### 1. Create Service Account in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Fill in details:
   - **Name**: `milestones-clinic-service`
   - **Description**: Service account for appointment booking system
6. Click **Create and Continue**
7. Skip role assignment (click **Continue**)
8. Click **Done**

### 2. Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create** - this downloads a JSON file
6. **Important**: Store this file securely and never commit it to version control!

### 3. Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Enable these APIs:
   - ✅ **Google Calendar API**
   - ✅ **Google Sheets API**

### 4. Share Calendar with Service Account

1. Go to [Google Calendar](https://calendar.google.com/)
2. Find your clinic calendar (or create one)
3. Click on the calendar → **Settings and sharing**
4. Under **Share with specific people**, click **Add people**
5. Enter the service account email (found in the JSON file as `client_email`)
   - Format: `something@project-id.iam.gserviceaccount.com`
6. Grant permission: **Make changes to events**
7. Click **Send**

### 5. Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click **Share** button
3. Enter the service account email (same as above)
4. Grant permission: **Editor**
5. Click **Send**

### 6. Configure Backend

**Option A: Use JSON File (Local Development)**

1. Place the downloaded JSON file in the `server/` directory
2. Name it `service-account.json` (or any name you prefer)
3. Update `server/.env`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_PATH=./service-account.json
   GOOGLE_CALENDAR_ID=your_calendar_id
   GOOGLE_SHEET_ID=your_sheet_id
   ```

**Option B: Use Environment Variable (Production)**

1. Copy the entire contents of the JSON file
2. In your hosting platform, set environment variable:
   ```env
   GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
   ```
   (Paste the entire JSON as a single-line string)

### 7. Update .gitignore

Make sure `server/.gitignore` includes:
```
service-account.json
*.json
.env
```

## What Changed?

### ❌ Removed
- OAuth routes (`/api/auth/*`)
- Frontend authentication flow
- GoogleAuthButton component
- Token storage and refresh logic
- Authorization headers in API calls

### ✅ Now Using
- Service Account authentication (automatic)
- No user interaction needed
- All authentication handled on server

## Testing

1. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Try booking an appointment - it should work without any authentication prompts!

## Troubleshooting

### Error: "Service Account not configured"
→ Check `GOOGLE_SERVICE_ACCOUNT_PATH` or `GOOGLE_SERVICE_ACCOUNT_JSON` is set in `.env`

### Error: "Permission denied" when creating calendar events
→ Service account email must have "Make changes to events" permission on the calendar

### Error: "Permission denied" when writing to sheet
→ Service account email must have "Editor" permission on the sheet

### Calendar/Sheet ID not found
→ Verify `GOOGLE_CALENDAR_ID` and `GOOGLE_SHEET_ID` are correct in `.env`

## Security Notes

- ✅ Service account JSON file is never exposed to frontend
- ✅ No tokens stored in localStorage
- ✅ No OAuth flow needed
- ✅ Credentials only on server
- ⚠️ Never commit service account JSON to version control
- ⚠️ Use environment variables in production (not file paths)

## Summary

With Service Account:
- ✅ Simpler setup
- ✅ More secure
- ✅ No user interaction
- ✅ Perfect for clinic operations
- ✅ No OAuth complexity

The booking system now works automatically without any authentication from users!

