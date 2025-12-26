/**
 * Format phone number for display (+91 XXXXX XXXXX)
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Remove leading 91 if present
  const cleaned = digits.startsWith('91') ? digits.slice(2) : digits;
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

/**
 * Generate unique booking ID (format: MCL-YYYYMMDD-XXX)
 */
export const generateBookingId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `MCL-${year}${month}${day}-${random}`;
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Format booking data for Google Sheets
 */
export const formatBookingForSheets = (bookingData: any): any[] => {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
  
  return [
    timestamp,
    bookingData.bookingId,
    bookingData.parentName,
    bookingData.childName,
    bookingData.age,
    bookingData.email,
    bookingData.phone,
    bookingData.reason,
    bookingData.appointmentDate,
    bookingData.appointmentTime,
    bookingData.status
  ];
};

