import { BookingConfirmation } from '../types/booking.types';
import { formatDateDisplay, formatTimeDisplay } from '../utils/dateHelpers';

/**
 * Send appointment confirmation email using EmailJS
 */
export const sendConfirmationEmail = async (
  bookingData: BookingConfirmation
): Promise<void> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration missing');
    }

    // Load EmailJS library dynamically
    const emailjs = await import('@emailjs/browser');

    const templateParams = {
      to_name: bookingData.parentName,
      to_email: bookingData.email,
      booking_id: bookingData.bookingId,
      child_name: bookingData.childName,
      appointment_date: formatDateDisplay(bookingData.appointmentDate),
      appointment_time: formatTimeDisplay(bookingData.appointmentTime),
      reason: bookingData.reason,
      clinic_name: 'Milestones Child Clinic',
      clinic_address: '123 Marine Drive, Churchgate, Mumbai, Maharashtra 400020',
      clinic_phone: '+91 98765 43210',
      clinic_email: 'info@milestoneschildclinic.com'
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

/**
 * Generate ICS file content for calendar download
 */
export const generateICSFile = (bookingData: BookingConfirmation): string => {
  const startDate = new Date(bookingData.appointmentDate);
  const [hours, minutes] = bookingData.appointmentTime.split(':');
  startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + 30);

  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Milestones Child Clinic//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `UID:${bookingData.bookingId}@milestoneschildclinic.com`,
    `SUMMARY:Appointment - ${bookingData.childName}`,
    `DESCRIPTION:Booking ID: ${bookingData.bookingId}\\nParent: ${bookingData.parentName}\\nChild: ${bookingData.childName}\\nReason: ${bookingData.reason}`,
    `LOCATION:Milestones Child Clinic, 123 Marine Drive, Churchgate, Mumbai, Maharashtra 400020`,
    `ORGANIZER;CN=Milestones Child Clinic:mailto:info@milestoneschildclinic.com`,
    `ATTENDEE;CN=${bookingData.parentName};RSVP=TRUE:mailto:${bookingData.email}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:EMAIL',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
};

/**
 * Download ICS file
 */
export const downloadICSFile = (bookingData: BookingConfirmation): void => {
  const icsContent = generateICSFile(bookingData);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `appointment-${bookingData.bookingId}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

