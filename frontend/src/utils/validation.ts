import { BookingFormData, FormErrors } from '../types/booking.types';

export const validateParentName = (name: string): string | undefined => {
  if (!name || name.trim().length === 0) {
    return 'Parent name is required';
  }
  if (name.trim().length < 2) {
    return 'Parent name must be at least 2 characters';
  }
  return undefined;
};

export const validateChildName = (name: string): string | undefined => {
  if (!name || name.trim().length === 0) {
    return "Child's name is required";
  }
  if (name.trim().length < 2) {
    return "Child's name must be at least 2 characters";
  }
  return undefined;
};

export const validateAge = (age: number): string | undefined => {
  if (!age && age !== 0) {
    return "Child's age is required";
  }
  if (age < 0 || age > 18) {
    return 'Age must be between 0 and 18 years';
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  if (!phone || phone.trim().length === 0) {
    return 'Phone number is required';
  }
  // Remove spaces, dashes, and +91 prefix for validation
  const cleanedPhone = phone.replace(/[\s\-+]/g, '').replace(/^91/, '');
  if (cleanedPhone.length !== 10 || !/^\d+$/.test(cleanedPhone)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return undefined;
};

export const validateReason = (reason: string): string | undefined => {
  if (!reason || reason.trim().length === 0) {
    return 'Reason for visit is required';
  }
  if (reason.trim().length > 500) {
    return 'Reason must be less than 500 characters';
  }
  return undefined;
};

export const validateDate = (date: Date | null): string | undefined => {
  if (!date) {
    return 'Please select a date';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return 'Cannot select past dates';
  }
  
  // Check if Sunday (0 = Sunday)
  if (selectedDate.getDay() === 0) {
    return 'Clinic is closed on Sundays';
  }
  
  return undefined;
};

export const validateTime = (time: string): string | undefined => {
  if (!time || time.trim().length === 0) {
    return 'Please select a time slot';
  }
  return undefined;
};

export const validateBookingForm = (formData: BookingFormData): FormErrors => {
  const errors: FormErrors = {};
  
  const parentNameError = validateParentName(formData.parentName);
  if (parentNameError) errors.parentName = parentNameError;
  
  const childNameError = validateChildName(formData.childName);
  if (childNameError) errors.childName = childNameError;
  
  const ageError = validateAge(formData.age);
  if (ageError) errors.age = ageError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const reasonError = validateReason(formData.reason);
  if (reasonError) errors.reason = reasonError;
  
  const dateError = validateDate(formData.date);
  if (dateError) errors.date = dateError;
  
  const timeError = validateTime(formData.time);
  if (timeError) errors.time = timeError;
  
  return errors;
};

export const isFormValid = (formData: BookingFormData): boolean => {
  const errors = validateBookingForm(formData);
  return Object.keys(errors).length === 0;
};

