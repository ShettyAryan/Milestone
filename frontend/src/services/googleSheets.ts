import { BookingConfirmation } from '../types/booking.types';
import { formatBookingForSheets } from '../utils/formatters';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Append booking data to Google Sheet
 */
export const appendBookingToSheet = async (
  bookingData: BookingConfirmation
): Promise<void> => {
  try {
    const values = formatBookingForSheets(bookingData);

    const response = await fetch(`${API_BASE_URL}/sheets/append`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to append to sheet');
    }

    console.log('Booking data appended to Google Sheet successfully');
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    throw error;
  }
};

/**
 * Initialize sheet headers if they don't exist
 */
export const initializeSheet = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sheets/headers`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to initialize sheet');
    }

    const data = await response.json();
    if (!data.headersExist && data.headersCreated) {
      console.log('Sheet headers created successfully');
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
    // Don't throw - this is not critical
  }
};

