# Quick Start Guide - Environment Variables Check

## ✅ Environment Variables You Need

Based on your code, you need these **5 environment variables** in your `.env.local` file:

```env
# Google Calendar
VITE_GOOGLE_CALENDAR_ID=your_calendar_id_here

# Google Sheets
VITE_GOOGLE_SHEET_ID=your_sheet_id_here

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## ⚠️ CRITICAL: Authentication Missing

**IMPORTANT**: The code currently expects OAuth tokens in `localStorage`, but there's **no OAuth implementation** yet. You have 3 options:

### Option 1: Quick Test (Manual Token) - For Testing Only

1. Get an OAuth token manually:
   - Use Google OAuth Playground: https://developers.google.com/oauthplayground/
   - Select scopes: `https://www.googleapis.com/auth/calendar` and `https://www.googleapis.com/auth/spreadsheets`
   - Authorize and get the access token
   - Open browser console and run:
     ```javascript
     localStorage.setItem('google_calendar_token', 'YOUR_TOKEN_HERE');
     localStorage.setItem('google_sheets_token', 'YOUR_TOKEN_HERE');
     ```
   - **Note**: Token expires in 1 hour, so this is only for quick testing

### Option 2: Implement Frontend OAuth (Development)

Add OAuth flow to your app:
1. Install: `npm install @react-oauth/google`
2. Wrap your app with GoogleOAuthProvider
3. Implement login button to get tokens
4. Store tokens in localStorage

### Option 3: Backend API (Production - Recommended)

Create a backend that:
- Handles OAuth securely
- Provides API endpoints for calendar/sheets operations
- Never exposes tokens to frontend

## 📋 Complete Checklist

### Environment Variables ✅
- [ ] `VITE_GOOGLE_CALENDAR_ID` - Set
- [ ] `VITE_GOOGLE_SHEET_ID` - Set
- [ ] `VITE_EMAILJS_SERVICE_ID` - Set
- [ ] `VITE_EMAILJS_TEMPLATE_ID` - Set
- [ ] `VITE_EMAILJS_PUBLIC_KEY` - Set

### Google Calendar Setup
- [ ] Calendar created in Google Calendar
- [ ] Calendar ID copied (found in calendar settings → Integrate calendar)
- [ ] Calendar API enabled in Google Cloud Console
- [ ] OAuth credentials created OR Service account created
- [ ] Calendar shared with service account (if using service account)

### Google Sheets Setup
- [ ] Spreadsheet created
- [ ] Sheet ID copied from URL (the long string between `/d/` and `/edit`)
- [ ] Headers added in Row 1:
  ```
  Timestamp | Booking ID | Parent Name | Child Name | Age | Email | Phone | Reason | Date | Time | Status
  ```
- [ ] Sheets API enabled in Google Cloud Console
- [ ] Sheet shared with service account (if using service account)

### EmailJS Setup
- [ ] EmailJS account created
- [ ] Email service connected (Gmail, etc.)
- [ ] Template created with all variables:
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

### Authentication Setup ⚠️
- [ ] Choose authentication method (OAuth or Service Account)
- [ ] Implement authentication flow
- [ ] Test token retrieval

## 🧪 Quick Test

1. **Test EmailJS** (easiest to test first):
   ```bash
   # In browser console after booking
   # Check if email was sent
   ```

2. **Test Calendar** (requires auth):
   ```bash
   # Check if calendar event was created
   # Visit your Google Calendar
   ```

3. **Test Sheets** (requires auth):
   ```bash
   # Check if row was added to sheet
   # Visit your Google Sheet
   ```

## 🐛 Common Issues

### "No access token found"
→ You need to implement authentication. See options above.

### "Google Sheet ID not configured"
→ Check `VITE_GOOGLE_SHEET_ID` in `.env.local`

### "EmailJS configuration missing"
→ Verify all 3 EmailJS variables are set

### Calendar/Sheets API errors
→ Check if APIs are enabled in Google Cloud Console
→ Verify OAuth token has correct scopes
→ Check if calendar/sheet is shared (if using service account)

## 📝 Next Steps

1. ✅ Verify all 5 environment variables are set
2. ⚠️ **Implement authentication** (choose one option above)
3. ✅ Test EmailJS (should work without auth)
4. ⚠️ Test Calendar (requires auth)
5. ⚠️ Test Sheets (requires auth)

## 💡 Recommendation

For **quick testing**: Use Option 1 (manual token) to test the flow
For **production**: Implement Option 3 (backend API)

