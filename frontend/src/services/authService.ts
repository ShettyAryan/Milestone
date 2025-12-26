/**
 * Authentication service for Google OAuth
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

/**
 * Get OAuth authorization URL from backend
 */
export const getAuthUrl = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`);
    const data = await response.json();
    return data.authUrl;
  } catch (error) {
    console.error('Error getting auth URL:', error);
    throw new Error('Failed to get authorization URL');
  }
};

/**
 * Exchange authorization code for tokens
 */
export const exchangeCodeForTokens = async (code: string): Promise<AuthTokens> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/callback?code=${code}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to exchange code for tokens');
    }

    return data.tokens;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken: string): Promise<AuthTokens> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to refresh token');
    }

    return {
      access_token: data.access_token,
      expiry_date: data.expiry_date
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

/**
 * Verify if access token is valid
 */
export const verifyToken = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ access_token: accessToken })
    });

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

/**
 * Get stored tokens from localStorage
 */
export const getStoredTokens = (): AuthTokens | null => {
  try {
    const stored = localStorage.getItem('google_auth_tokens');
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading stored tokens:', error);
    return null;
  }
};

/**
 * Store tokens in localStorage
 */
export const storeTokens = (tokens: AuthTokens): void => {
  try {
    localStorage.setItem('google_auth_tokens', JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

/**
 * Clear stored tokens
 */
export const clearTokens = (): void => {
  localStorage.removeItem('google_auth_tokens');
};

/**
 * Get valid access token (refresh if needed)
 */
export const getValidAccessToken = async (): Promise<string> => {
  const tokens = getStoredTokens();
  
  if (!tokens) {
    throw new Error('No tokens found. Please authenticate first.');
  }

  // Check if token is expired
  if (tokens.expiry_date && Date.now() >= tokens.expiry_date) {
    if (!tokens.refresh_token) {
      throw new Error('Token expired and no refresh token available');
    }

    // Refresh token
    const newTokens = await refreshAccessToken(tokens.refresh_token);
    const updatedTokens = {
      ...tokens,
      access_token: newTokens.access_token,
      expiry_date: newTokens.expiry_date
    };
    storeTokens(updatedTokens);
    return updatedTokens.access_token;
  }

  // Verify token is still valid
  const isValid = await verifyToken(tokens.access_token);
  if (!isValid && tokens.refresh_token) {
    // Token invalid, try to refresh
    const newTokens = await refreshAccessToken(tokens.refresh_token);
    const updatedTokens = {
      ...tokens,
      access_token: newTokens.access_token,
      expiry_date: newTokens.expiry_date
    };
    storeTokens(updatedTokens);
    return updatedTokens.access_token;
  }

  return tokens.access_token;
};

