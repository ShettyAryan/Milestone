export interface BookingFormData {
  appointmentType: 'online' | 'offline' | '';
  parentFirstName: string;
  parentLastName: string;
  childFirstName: string;
  childLastName: string;
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
  appointmentType: 'online' | 'offline';
  parentFirstName: string;
  parentLastName: string;
  childFirstName: string;
  childLastName: string;
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
  appointmentType?: string;
  parentFirstName?: string;
  parentLastName?: string;
  childFirstName?: string;
  childLastName?: string;
  age?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  reason?: string;
  date?: string;
  time?: string;
}

