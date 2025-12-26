import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes required for the application
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/spreadsheets'
];

/**
 * GET /api/auth/google
 * Initiates Google OAuth flow
 */
router.get('/google', (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent' // Force consent to get refresh token
    });
    
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

/**
 * GET /api/auth/google/callback
 * Handles OAuth callback and stores tokens
 */
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens securely (in production, use a database)
    // For now, we'll return them to be stored on the client
    // In production, store in database with user session
    
    // Redirect to frontend with tokens in query params (for development)
    // In production, use a more secure method (e.g., postMessage, server-side session)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const tokenParams = new URLSearchParams({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || '',
      expiry_date: tokens.expiry_date?.toString() || ''
    });
    
    res.redirect(`${frontendUrl}/auth/callback?${tokenParams.toString()}`);
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * POST /api/auth/refresh
 * Refreshes the access token using refresh token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token not provided' });
    }

    oauth2Client.setCredentials({
      refresh_token: refresh_token
    });

    const { credentials } = await oauth2Client.refreshAccessToken();

    res.json({
      success: true,
      access_token: credentials.access_token,
      expiry_date: credentials.expiry_date
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

/**
 * POST /api/auth/verify
 * Verifies if an access token is valid
 */
router.post('/verify', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token not provided' });
    }

    oauth2Client.setCredentials({
      access_token: access_token
    });

    // Try to get user info to verify token
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    await oauth2.userinfo.get();

    res.json({ valid: true });
  } catch (error) {
    res.json({ valid: false, error: error.message });
  }
});

export { router as authRouter };

