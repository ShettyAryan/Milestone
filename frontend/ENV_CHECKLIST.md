# Environment Variables Checklist

## ✅ Required Environment Variables

Based on the code review, here are all the environment variables you need:

### Google Calendar API
- ✅ `VITE_GOOGLE_CALENDAR_ID` - Your Google Calendar ID (e.g., `primary` or a specific calendar ID)

### Google Sheets API  
- ✅ `VITE_GOOGLE_SHEET_ID` - Your Google Sheet ID (from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`)

### EmailJS
- ✅ `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- ✅ `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
- ✅ `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

## ⚠️ Important: Authentication Setup

**CRITICAL**: The current code expects OAuth tokens to be stored in `localStorage`, but there's **no OAuth implementation** in the frontend yet. You have two options:

### Option 1: Backend Authentication (Recommended for Production)
You'll need to create a backend API that:
- Handles Google OAuth flow
- Stores tokens securely
- Provides API endpoints for:
  - Creating calendar events
  - Reading calendar events (for availability)
  - Writing to Google Sheets

### Option 2: Frontend OAuth (Development/Testing Only)
If you want to test without a backend, you'll need to:
1. Add `@react-oauth/google` package
2. Implement OAuth flow in the frontend
3. Store tokens in localStorage (NOT secure for production)

## 🔍 Additional Configuration Needed

### 1. Google OAuth Credentials (if using frontend OAuth)
While not directly used in the service files, you'll need these for OAuth:
- `VITE_GOOGLE_CLIENT_ID` - OAuth 2.0 Client ID
- `VITE_GOOGLE_API_KEY` - API Key (optional, for some use cases)

### 2. Google Calendar Setup
- ✅ Calendar created in Google Calendar
- ✅ Calendar ID copied to `VITE_GOOGLE_CALENDAR_ID`
- ⚠️ Calendar shared with service account (if using service account)
- ⚠️ Calendar API enabled in Google Cloud Console

### 3. Google Sheets Setup
- ✅ Spreadsheet created
- ✅ Sheet ID copied to `VITE_GOOGLE_SHEET_ID`
- ✅ Headers added to Sheet1 (Row 1):
  - Timestamp | Booking ID | Parent Name | Child Name | Age | Email | Phone | Reason | Date | Time | Status
- ⚠️ Sheet shared with service account (if using service account)
- ⚠️ Sheets API enabled in Google Cloud Console

### 4. EmailJS Setup
- ✅ Email service connected (Gmail, etc.)
- ✅ Template created with these variables:
  - `{{to_name}}`
  - `{{to_email}}`
  - `{{booking_id}}`
  - `{{child_name}}`
  - `{{appointment_date}}`
  - `{{appointment_time}}`
  - `{{reason}}`
  - `{{clinic_name}}`
  - `{{clinic_address}}`
  - `{{clinic_phone}}`
  - `{{clinic_email}}`

## 🧪 Testing Checklist

Before testing, verify:

1. **Environment Variables**
   ```bash
   # Check if all variables are set (in .env.local)
   VITE_GOOGLE_CALENDAR_ID=...
   VITE_GOOGLE_SHEET_ID=...
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```

2. **Google APIs Enabled**
   - [ ] Google Calendar API enabled
   - [ ] Google Sheets API enabled
   - [ ] OAuth consent screen configured
   - [ ] OAuth credentials created

3. **Authentication**
   - [ ] OAuth tokens available OR
   - [ ] Service account JSON file configured OR
   - [ ] Backend API endpoints ready

4. **Google Calendar**
   - [ ] Calendar exists and is accessible
   - [ ] Calendar ID is correct
   - [ ] Calendar is shared (if using service account)

5. **Google Sheets**
   - [ ] Spreadsheet exists
   - [ ] Sheet ID is correct (from URL)
   - [ ] Headers are in Row 1
   - [ ] Sheet is shared (if using service account)

6. **EmailJS**
   - [ ] Service is connected and working
   - [ ] Template has all required variables
   - [ ] Template ID matches environment variable

## 🚨 Common Issues

### Issue: "No access token found"
**Solution**: You need to implement OAuth authentication. The code expects tokens in localStorage but there's no OAuth flow implemented yet.

### Issue: "Google Sheet ID not configured"
**Solution**: Make sure `VITE_GOOGLE_SHEET_ID` is set in your `.env.local` file.

### Issue: "EmailJS configuration missing"
**Solution**: Verify all three EmailJS variables are set:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### Issue: Calendar events not creating
**Solution**: 
- Check if Calendar API is enabled
- Verify OAuth token has correct scopes
- Check calendar ID is correct
- Ensure calendar is shared with service account (if using)

## 📝 Next Steps

1. **If you haven't set up authentication yet:**
   - Choose between backend OAuth or frontend OAuth
   - Implement the chosen authentication method
   - Update the service files to use your authentication

2. **Test each integration separately:**
   - Test calendar event creation
   - Test sheet writing
   - Test email sending

3. **For production:**
   - Implement backend authentication
   - Never expose OAuth tokens in frontend
   - Use environment variables in your hosting platform

