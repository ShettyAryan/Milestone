# Appointment Booking System Setup Guide

This guide will walk you through setting up the appointment booking system for Milestones Child Clinic.

## Prerequisites

- Google Cloud Platform account
- EmailJS account (for email notifications)
- Node.js and npm installed

## Step 1: Google Cloud Platform Setup

### 1.1 Create a New Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "Milestones Clinic Booking" (or your preferred name)
4. Click "Create"

### 1.2 Enable Required APIs

1. Navigate to "APIs & Services" → "Library"
2. Enable the following APIs:
   - **Google Calendar API**
   - **Google Sheets API**

### 1.3 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Milestones Child Clinic
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
   - Add scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/spreadsheets`
   - Save and continue through the steps
4. Create OAuth client ID:
   - Application type: Web application
   - Name: Milestones Clinic Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
5. Copy the **Client ID** and **Client Secret**

### 1.4 Create Service Account (Alternative - Recommended for Production)

For production, it's recommended to use a Service Account instead of OAuth:

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service account"
3. Name: "milestones-clinic-booking"
4. Grant roles: "Editor" (or more specific roles)
5. Click "Create Key" → JSON
6. Download and securely store the JSON file
7. **Important**: Never commit this file to version control!

## Step 2: Google Calendar Setup

### 2.1 Create a Calendar

1. Go to [Google Calendar](https://calendar.google.com/)
2. Click the "+" next to "Other calendars"
3. Select "Create new calendar"
4. Name: "Milestones Clinic Appointments"
5. Copy the Calendar ID (found in calendar settings)

### 2.2 Share Calendar (if using Service Account)

1. Open calendar settings
2. Under "Share with specific people", add your service account email
3. Grant "Make changes to events" permission

## Step 3: Google Sheets Setup

### 3.1 Create a Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Milestones Clinic Bookings"
4. Add headers in Row 1:
   - Timestamp
   - Booking ID
   - Parent Name
   - Child Name
   - Age
   - Email
   - Phone
   - Reason
   - Date
   - Time
   - Status
5. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

### 3.2 Share Sheet (if using Service Account)

1. Click "Share" button
2. Add your service account email
3. Grant "Editor" permission

## Step 4: EmailJS Setup

### 4.1 Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 4.2 Add Email Service

1. Go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy the **Service ID**

### 4.3 Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Template ID: `appointment_confirmation` (or your choice)
4. Design your template with these variables:
   - `{{to_name}}` - Parent's name
   - `{{to_email}}` - Parent's email
   - `{{booking_id}}` - Booking ID
   - `{{child_name}}` - Child's name
   - `{{appointment_date}}` - Appointment date
   - `{{appointment_time}}` - Appointment time
   - `{{reason}}` - Reason for visit
   - `{{clinic_name}}` - Clinic name
   - `{{clinic_address}}` - Clinic address
   - `{{clinic_phone}}` - Clinic phone
   - `{{clinic_email}}` - Clinic email
5. Copy the **Template ID**

### 4.4 Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all the values:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_from_step_1.3
VITE_GOOGLE_API_KEY=your_api_key_from_step_1.3
VITE_GOOGLE_CALENDAR_ID=your_calendar_id_from_step_2.1
VITE_GOOGLE_SHEET_ID=your_sheet_id_from_step_3.1
VITE_EMAILJS_SERVICE_ID=your_service_id_from_step_4.2
VITE_EMAILJS_TEMPLATE_ID=your_template_id_from_step_4.3
VITE_EMAILJS_PUBLIC_KEY=your_public_key_from_step_4.4
```

## Step 6: Install Dependencies

```bash
npm install
```

This will install:
- `@emailjs/browser` - For sending emails
- `react-hot-toast` - For toast notifications

## Step 7: Authentication Setup (Important!)

### Option A: Backend Authentication (Recommended for Production)

The current implementation expects OAuth tokens in localStorage, which is not secure for production. For production, you should:

1. Create a backend API endpoint to handle OAuth flow
2. Store tokens securely on the server
3. Use the backend to make API calls to Google services
4. Update the service files to call your backend instead

### Option B: Frontend Authentication (Development Only)

For development/testing only:

1. Implement Google OAuth in the frontend using `@react-oauth/google`
2. Store tokens temporarily in localStorage
3. **Warning**: This is not secure for production!

## Step 8: Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/book-appointment`

3. Test the booking flow:
   - Fill in all form fields
   - Select a date (not Sunday, not in the past)
   - Select a time slot
   - Submit the form

4. Verify:
   - Calendar event is created
   - Email is sent
   - Sheet row is added
   - Confirmation page displays correctly

## Troubleshooting

### Calendar Events Not Creating

- Check if Google Calendar API is enabled
- Verify OAuth token has correct scopes
- Check calendar ID is correct
- Ensure calendar is shared with service account (if using)

### Emails Not Sending

- Verify EmailJS service is connected
- Check template variables match exactly
- Verify public key is correct
- Check EmailJS dashboard for error logs

### Sheets Not Updating

- Verify Google Sheets API is enabled
- Check sheet ID is correct
- Ensure sheet is shared with service account (if using)
- Check sheet headers match expected format

### Authentication Errors

- Verify OAuth credentials are correct
- Check redirect URIs match exactly
- Ensure APIs are enabled in Google Cloud Console
- For production, implement backend authentication

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use environment variables for all secrets**
3. **Implement backend authentication for production**
4. **Use HTTPS in production**
5. **Implement rate limiting**
6. **Validate all user inputs**
7. **Sanitize data before storing**

## Production Deployment

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Update authorized origins/redirects in Google Cloud Console
3. Implement backend authentication
4. Set up monitoring and error tracking
5. Test thoroughly before going live

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Google API documentation
- Check EmailJS documentation
- Contact the development team

