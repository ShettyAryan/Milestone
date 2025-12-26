export interface BookingFormData {
  parentName: string;
  childName: string;
  age: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  reason: string;
  date: Date | null;
  time: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  displayTime: string;
}

export interface BookingConfirmation {
  bookingId: string;
  parentName: string;
  childName: string;
  age: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  reason: string;
  appointmentDate: Date;
  appointmentTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface FormErrors {
  parentName?: string;
  childName?: string;
  age?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  reason?: string;
  date?: string;
  time?: string;
}

