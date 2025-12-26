import { BookingFormData } from '../types/booking.types';
import { timeStringToDate } from '../utils/dateHelpers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Create a calendar event for the appointment
 */
export const createCalendarEvent = async (
  bookingData: BookingFormData,
  bookingId: string
): Promise<string> => {
  try {
    if (!bookingData.date || !bookingData.time) {
      throw new Error('Date and time are required');
    }

    const appointmentDateTime = timeStringToDate(bookingData.date, bookingData.time);
    const endDateTime = new Date(appointmentDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 30-minute appointment

    const response = await fetch(`${API_BASE_URL}/calendar/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        summary: `Appointment: ${bookingData.childName} - Milestones Child Clinic`,
        description: `
Booking ID: ${bookingId}
Parent Name: ${bookingData.parentName}
Child Name: ${bookingData.childName}
Age: ${bookingData.age} years
Phone: ${bookingData.phone}
Email: ${bookingData.email}
Reason: ${bookingData.reason}

Clinic: Milestones Child Clinic
Address: 123 Marine Drive, Churchgate, Mumbai, Maharashtra 400020
Phone: +91 98765 43210
        `.trim(),
        startDateTime: appointmentDateTime.toISOString(),
        endDateTime: endDateTime.toISOString()
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to create calendar event');
    }

    const data = await response.json();
    return data.eventId;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

/**
 * Get available time slots for a specific date
 */
export const getAvailableSlots = async (date: Date): Promise<string[]> => {
  try {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    const response = await fetch(
      `${API_BASE_URL}/calendar/availability?date=${dateStr}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch available slots');
    }

    const data = await response.json();
    return data.bookedSlots || [];
  } catch (error) {
    console.error('Error fetching available slots:', error);
    // Return empty array on error to allow booking to continue
    return [];
  }
};

/**
 * Check if a specific time slot is available
 */
export const checkSlotAvailability = async (
  date: Date,
  time: string
): Promise<boolean> => {
  try {
    const bookedSlots = await getAvailableSlots(date);
    return !bookedSlots.includes(time);
  } catch (error) {
    console.error('Error checking slot availability:', error);
    return true; // Assume available on error
  }
};

