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
 * POST /api/sheets/append
 * Append a row to the Google Sheet
 */
router.post('/append', async (req, res) => {
  try {
    const { values } = req.body;

    if (!values || !Array.isArray(values)) {
      return res.status(400).json({ error: 'Values array is required' });
    }

    const auth = getAuth();
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return res.status(500).json({ error: 'Google Sheet ID not configured' });
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A:L',
      valueInputOption: 'RAW',
      requestBody: {
        values: [values]
      }
    });

    res.json({
      success: true,
      updatedCells: response.data.updates?.updatedCells || 0,
      updatedRange: response.data.updates?.updatedRange
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    res.status(500).json({
      error: 'Failed to append to sheet',
      message: error.message
    });
  }
});

/**
 * GET /api/sheets/headers
 * Check if sheet headers exist, create if they don't
 */
router.get('/headers', async (req, res) => {
  try {
    const auth = getAuth();
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return res.status(500).json({ error: 'Google Sheet ID not configured' });
    }

    // Check if headers exist
    try {
      const readResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Sheet1!A1:L1'
      });

      if (readResponse.data.values && readResponse.data.values.length > 0) {
        return res.json({
          success: true,
          headersExist: true,
          headers: readResponse.data.values[0]
        });
      }
    } catch (error) {
      // Headers don't exist, create them
    }

    // Create headers
    const headers = [
      'Timestamp',
      'Booking ID',
      'Parent Name',
      'Child Name',
      'Age',
      'Email',
      'Phone',
      'Reason',
      'Date',
      'Time',
      'Status'
    ];

    const writeResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A1:L1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers]
      }
    });

    res.json({
      success: true,
      headersExist: false,
      headersCreated: true,
      headers: headers
    });
  } catch (error) {
    console.error('Error managing sheet headers:', error);
    res.status(500).json({
      error: 'Failed to manage sheet headers',
      message: error.message
    });
  }
});

export { router as sheetsRouter };

