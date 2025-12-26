/**
 * Get all dates in a month that are not Sundays and not in the past
 */
export const getAvailableDates = (year: number, month: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    // Skip past dates and Sundays
    if (date >= today && date.getDay() !== 0) {
      dates.push(date);
    }
  }
  
  return dates;
};

/**
 * Check if a date is available (not Sunday and not in the past)
 */
export const isDateAvailable = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate >= today && checkDate.getDay() !== 0;
};

/**
 * Format date for display (e.g., "Monday, January 15, 2024")
 */
export const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date for API (YYYY-MM-DD)
 */
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get time slots for a day (9:00 AM to 5:00 PM, 30-minute intervals)
 */
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  
  return slots;
};

/**
 * Format time for display (e.g., "9:00 AM")
 */
export const formatTimeDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Convert time string to Date object for a given date
 */
export const timeStringToDate = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':');
  const appointmentDate = new Date(date);
  appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return appointmentDate;
};

/**
 * Get IST timezone offset
 */
export const getISTOffset = (): string => {
  return '+05:30';
};

/**
 * Check if a time slot is in the past for a given date
 * Used to hide past time slots when selecting today's date
 */
export const isTimeSlotInPast = (date: Date, time: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  // If the date is not today, the time slot is not in the past
  if (checkDate.getTime() !== today.getTime()) {
    return false;
  }
  
  // If the date is today, check if the time has passed
  const [hours, minutes] = time.split(':');
  const slotTime = new Date();
  slotTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  
  const now = new Date();
  
  return slotTime < now;
};

