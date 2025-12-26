
  # Milestones Clinic Landing Page

  ## Features

  - **Landing Page**: Beautiful, responsive landing page showcasing Milestones Child Clinic
  - **Appointment Booking System**: Advanced booking system with Google Calendar and Sheets integration
  - **Email Notifications**: Automated confirmation emails via EmailJS
  - **Multi-page Navigation**: Home, About, Clinic, Blog, and Contact pages

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Appointment Booking System

  The website includes a comprehensive appointment booking system with the following features:

  - **Form Validation**: Real-time validation for all booking fields
  - **Date & Time Selection**: Custom date picker with availability checking
  - **Google Calendar Integration**: Automatic calendar event creation
  - **Google Sheets Logging**: All bookings are logged to a Google Sheet
  - **Email Confirmations**: Automated email notifications via EmailJS
  - **Booking Confirmation Page**: Detailed confirmation with calendar download

  ### Setting Up the Booking System

  See [SETUP.md](./SETUP.md) for detailed instructions on:
  - Google Cloud Platform configuration
  - Google Calendar setup
  - Google Sheets setup
  - EmailJS configuration
  - Environment variables

  ### Required Environment Variables

  Copy `.env.example` to `.env.local` and fill in your credentials:

  ```env
  VITE_GOOGLE_CLIENT_ID=your_client_id
  VITE_GOOGLE_API_KEY=your_api_key
  VITE_GOOGLE_CALENDAR_ID=your_calendar_id
  VITE_GOOGLE_SHEET_ID=your_sheet_id
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  ```

  ## Project Structure

  ```
  src/
  ├── components/
  │   ├── booking/          # Booking system components
  │   │   ├── BookingForm.tsx
  │   │   ├── DatePicker.tsx
  │   │   ├── TimeSlotSelector.tsx
  │   │   └── BookingConfirmation.tsx
  │   ├── common/           # Shared components
  │   │   └── LoadingSpinner.tsx
  │   └── ...                # Other page components
  ├── services/              # API service integrations
  │   ├── googleCalendar.ts
  │   ├── googleSheets.ts
  │   └── emailService.ts
  ├── utils/                 # Utility functions
  │   ├── validation.ts
  │   ├── dateHelpers.ts
  │   └── formatters.ts
  ├── types/                 # TypeScript types
  │   └── booking.types.ts
  └── pages/                 # Page components
      └── BookingPage.tsx
  ```

  ## Technologies Used

  - **React 18** with TypeScript
  - **Vite** for build tooling
  - **Tailwind CSS v4** for styling
  - **React Router** for navigation
  - **Lucide React** for icons
  - **EmailJS** for email notifications
  - **React Hot Toast** for notifications
  - **Google Calendar API** for appointment scheduling
  - **Google Sheets API** for booking logging

  ## Development

  ```bash
  # Install dependencies
  npm install

  # Start development server
  npm run dev

  # Build for production
  npm run build
  ```

  ## Deployment

  The project is configured for Vercel deployment. Make sure to:

  1. Set all environment variables in Vercel dashboard
  2. Update Google OAuth redirect URIs to include your production domain
  3. Test the booking flow thoroughly before going live

  ## Support

  For setup issues, refer to [SETUP.md](./SETUP.md) or contact the development team.
  