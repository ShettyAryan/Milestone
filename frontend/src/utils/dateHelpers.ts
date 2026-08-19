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
 * Check if a date is available based on appointment type
 * Online: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday (all days except Sunday)
 * Offline: Tuesday (2), Thursday (4), Saturday (6) only
 * Sunday (0) is never available
 */
export const isDateAvailable = (date: Date, appointmentType: 'online' | 'offline' | '' = ''): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  // Cannot be in the past or Sunday
  if (checkDate < today || checkDate.getDay() === 0) {
    return false;
  }
  
  // If no appointment type selected, allow any day except Sunday
  if (!appointmentType) {
    return true;
  }
  
  const dayOfWeek = checkDate.getDay();
  
  if (appointmentType === 'online') {
    // Online: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday (all days except Sunday)
    // Since Sunday is already filtered out above, all remaining days are valid for online
    return true;
  } else if (appointmentType === 'offline') {
    // Offline: Tuesday (2), Thursday (4), Saturday (6) only
    return dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
  }
  
  return false;
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
 * Get time slots for a day (7:00 PM to 9:00 PM, 15-minute intervals)
 */
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  const startHour = 19; // 7 PM
  const endHour = 21; // 9 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:15`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
    slots.push(`${String(hour).padStart(2, '0')}:45`);
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


/**
 * Format a blog post's publish date (e.g. "15 March 2024")
 */
export const formatPostDate = (isoDate: string): string => {
  if (!isoDate) return '';

  return new Date(isoDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
