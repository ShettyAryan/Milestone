import { BookingFormData, FormErrors } from '../types/booking.types';

export const validateFirstName = (name: string, fieldName: string = 'First name'): string | undefined => {
  if (!name || name.trim().length === 0) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  return undefined;
};

export const validateLastName = (name: string, fieldName: string = 'Last name'): string | undefined => {
  if (!name || name.trim().length === 0) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  return undefined;
};

export const validateAge = (age: string): string | undefined => {
  if (!age || age.trim().length === 0) {
    return "Child's age is required";
  }
  return undefined;
};

export const validateDateOfBirth = (dateOfBirth: string): string | undefined => {
  if (!dateOfBirth || dateOfBirth.trim().length === 0) {
    return "Child's date of birth is required";
  }
  
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateOfBirth)) {
    return 'Please enter a valid date (YYYY-MM-DD)';
  }
  
  // Check if date is not in the future
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (birthDate > today) {
    return 'Date of birth cannot be in the future';
  }
  
  // Check if date is not too old (reasonable limit, e.g., 100 years ago)
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(today.getFullYear() - 100);
  
  if (birthDate < hundredYearsAgo) {
    return 'Please enter a valid date of birth';
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

export const validateDate = (date: Date | null, appointmentType: 'online' | 'offline' | '' = ''): string | undefined => {
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
  
  // Check if date is available for the selected appointment type
  if (appointmentType) {
    const dayOfWeek = selectedDate.getDay();
    if (appointmentType === 'online') {
      // Online: Monday (1), Wednesday (3), Friday (5)
      if (dayOfWeek !== 1 && dayOfWeek !== 3 && dayOfWeek !== 5) {
        return 'Online appointments are only available on Monday, Wednesday, and Friday';
      }
    } else if (appointmentType === 'offline') {
      // Offline: Tuesday (2), Thursday (4), Saturday (6)
      if (dayOfWeek !== 2 && dayOfWeek !== 4 && dayOfWeek !== 6) {
        return 'Offline appointments are only available on Tuesday, Thursday, and Saturday';
      }
    }
  }
  
  return undefined;
};

export const validateTime = (time: string): string | undefined => {
  if (!time || time.trim().length === 0) {
    return 'Please select a time slot';
  }
  return undefined;
};

export const validateAppointmentType = (appointmentType: string): string | undefined => {
  if (!appointmentType || appointmentType.trim().length === 0) {
    return 'Please select appointment type (Online or Offline)';
  }
  if (appointmentType !== 'online' && appointmentType !== 'offline') {
    return 'Please select either Online or Offline';
  }
  return undefined;
};

export const validatePatientCode = (patientCode: string, visitedBefore: boolean): string | undefined => {
  // Only validate if visitedBefore is true
  if (visitedBefore) {
    if (!patientCode || patientCode.trim().length === 0) {
      return 'Patient code is required';
    }
    if (patientCode.trim().length < 2) {
      return 'Patient code must be at least 2 characters';
    }
  }
  return undefined;
};

export const validateBookingForm = (formData: BookingFormData): FormErrors => {
  const errors: FormErrors = {};
  
  const appointmentTypeError = validateAppointmentType(formData.appointmentType);
  if (appointmentTypeError) errors.appointmentType = appointmentTypeError;
  
  const parentFirstNameError = validateFirstName(formData.parentFirstName, "Parent's first name");
  if (parentFirstNameError) errors.parentFirstName = parentFirstNameError;
  
  const parentLastNameError = validateLastName(formData.parentLastName, "Parent's last name");
  if (parentLastNameError) errors.parentLastName = parentLastNameError;
  
  const childFirstNameError = validateFirstName(formData.childFirstName, "Child's first name");
  if (childFirstNameError) errors.childFirstName = childFirstNameError;
  
  const childLastNameError = validateLastName(formData.childLastName, "Child's last name");
  if (childLastNameError) errors.childLastName = childLastNameError;
  
  const ageError = validateAge(formData.age);
  if (ageError) errors.age = ageError;
  
  const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);
  if (dateOfBirthError) errors.dateOfBirth = dateOfBirthError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const reasonError = validateReason(formData.reason);
  if (reasonError) errors.reason = reasonError;
  
  // Validate patient code only if visitedBefore is true
  const patientCodeError = validatePatientCode(formData.patientCode, formData.visitedBefore);
  if (patientCodeError) errors.patientCode = patientCodeError;
  
  const dateError = validateDate(formData.date, formData.appointmentType);
  if (dateError) errors.date = dateError;
  
  const timeError = validateTime(formData.time);
  if (timeError) errors.time = timeError;
  
  return errors;
};

export const isFormValid = (formData: BookingFormData): boolean => {
  const errors = validateBookingForm(formData);
  return Object.keys(errors).length === 0;
};

