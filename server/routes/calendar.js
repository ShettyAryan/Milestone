import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize Google Auth with Service Account
 */
const getAuth = () => {
  // Check if using service account JSON file
  const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
  
  if (serviceAccountPath) {
    // Use service account from file path
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountPath,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets'
      ]
    });
    return auth;
  }
  
  // Check if using service account JSON content from env
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    const credentials = JSON.parse(serviceAccountJson);
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets'
      ]
    });
    return auth;
  }

  throw new Error('Google Service Account not configured. Please set GOOGLE_SERVICE_ACCOUNT_PATH or GOOGLE_SERVICE_ACCOUNT_JSON');
};

/**
 * POST /api/calendar/events
 * Create a new calendar event
 */
router.post('/events', async (req, res) => {
  try {
    const {
      summary,
      description,
      startDateTime,
      endDateTime
    } = req.body;

    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ error: 'Start and end date/time are required' });
    }

    const auth = getAuth();
    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const event = {
      summary: summary || 'Appointment - Milestones Child Clinic',
      description: description || '',
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Kolkata'
      },
      // No attendees - event only added to clinic calendar, not client calendar
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 } // 30 minutes before
        ]
      }
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event
    });

    res.json({
      success: true,
      eventId: response.data.id,
      event: response.data
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({
      error: 'Failed to create calendar event',
      message: error.message
    });
  }
});

/**
 * GET /api/calendar/events
 * Get events for a specific date range
 */
router.get('/events', async (req, res) => {
  try {
    const { timeMin, timeMax } = req.query;

    if (!timeMin || !timeMax) {
      return res.status(400).json({ error: 'timeMin and timeMax query parameters are required' });
    }

    const auth = getAuth();
    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    });

    // Extract booked time slots
    const bookedSlots = [];
    response.data.items?.forEach((event) => {
      if (event.start?.dateTime) {
        const eventStart = new Date(event.start.dateTime);
        const hours = String(eventStart.getHours()).padStart(2, '0');
        const minutes = String(eventStart.getMinutes()).padStart(2, '0');
        bookedSlots.push(`${hours}:${minutes}`);
      }
    });

    res.json({
      success: true,
      bookedSlots: bookedSlots,
      events: response.data.items
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({
      error: 'Failed to fetch calendar events',
      message: error.message
    });
  }
});

/**
 * GET /api/calendar/availability
 * Get available time slots for a specific date
 */
router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const auth = getAuth();
    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    // Extract booked time slots
    const bookedSlots = [];
    response.data.items?.forEach((event) => {
      if (event.start?.dateTime) {
        const eventStart = new Date(event.start.dateTime);
        const hours = String(eventStart.getHours()).padStart(2, '0');
        const minutes = String(eventStart.getMinutes()).padStart(2, '0');
        bookedSlots.push(`${hours}:${minutes}`);
      }
    });

    res.json({
      success: true,
      date: date,
      bookedSlots: bookedSlots
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({
      error: 'Failed to fetch availability',
      message: error.message
    });
  }
});

export { router as calendarRouter };

