import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { BookingForm } from '../components/booking/BookingForm';
import { AppointmentTypeSelector } from '../components/booking/AppointmentTypeSelector';
import { DatePicker } from '../components/booking/DatePicker';
import { TimeSlotSelector } from '../components/booking/TimeSlotSelector';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BookingFormData, BookingConfirmation as BookingConfirmationType, FormErrors } from '../types/booking.types';
import { validateBookingForm, isFormValid } from '../utils/validation';
import { generateBookingId } from '../utils/formatters';
import { createCalendarEvent, getAvailableSlots } from '../services/googleCalendar';
import { formatDateForAPI } from '../utils/dateHelpers';
import { appendBookingToSheet } from '../services/googleSheets';
import { sendConfirmationEmail } from '../services/emailService';

type BookingStep = 'form' | 'confirmation';

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<BookingStep>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmationType | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    appointmentType: '',
    parentFirstName: '',
    parentLastName: '',
    childFirstName: '',
    childLastName: '',
    age: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    reason: '',
    visitedBefore: false,
    patientCode: '',
    date: null,
    time: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Reset date and time when appointment type changes
  useEffect(() => {
    if (formData.appointmentType) {
      setFormData((prev) => ({ ...prev, date: null, time: '' }));
      setBookedSlots([]);
    }
  }, [formData.appointmentType]);

  // Fetch available slots when date changes
  // Use date string as dependency to ensure it re-runs even if the same date is selected again
  // Use formatDateForAPI to avoid timezone shift issues
  const dateString = formData.date ? formatDateForAPI(formData.date) : null;
  
  useEffect(() => {
    // Don't fetch slots if we're on the confirmation page
    if (step === 'confirmation') {
      return;
    }
    
    if (formData.date && dateString) {
      setIsLoadingSlots(true);
      // Always fetch fresh data from API to get the latest booked slots
      // Add cache-busting timestamp to ensure we get the most current data
      getAvailableSlots(formData.date)
        .then((slots) => {
          // Normalize API response slots - these are the ACTUAL booked slots from Google Calendar
          const normalizedApiSlots = slots.map((slot) => slot.trim());
          
          // Always replace with API response - API is the source of truth for what's actually booked
          // This ensures that after "Book Another" or page refresh, we show accurate data from Google Calendar
          setBookedSlots(normalizedApiSlots);
        })
        .catch((error) => {
          console.error('Error fetching slots:', error);
          toast.error('Unable to fetch available slots. Please try again.');
          // Don't clear booked slots on error - keep existing ones
        })
        .finally(() => {
          setIsLoadingSlots(false);
        });
    } else {
      // Clear booked slots when no date is selected
      setBookedSlots([]);
    }
  }, [formData.date, dateString, step]);

  const handleFieldChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFieldBlur = (field: keyof BookingFormData) => {
    const newErrors = validateBookingForm(formData);
    setErrors(newErrors);
  };

  const handleDateSelect = (date: Date) => {
    // Reset time when date changes
    setFormData((prev) => ({ ...prev, date, time: '' }));
    
    // Clear booked slots to force fresh fetch
    // The useEffect will automatically fetch fresh slots from API when date changes
    // This ensures we always get the latest booked slots from Google Calendar
    setBookedSlots([]);
  };

  const handleTimeSelect = (time: string) => {
    handleFieldChange('time', time);
  };

  const handleAppointmentTypeSelect = (type: 'online' | 'offline') => {
    handleFieldChange('appointmentType', type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(formData)) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    const bookingId = generateBookingId();

    try {
      // Create calendar event
      let calendarEventId: string | null = null;
      try {
        // Normalize the booked time once for consistent use
        const bookedTimeNormalized = formData.time.trim();
        
        // IMMEDIATELY add the booked time to the list (optimistic update)
        // This ensures the slot disappears instantly, before API calls complete
        setBookedSlots((prev) => {
          // Normalize all existing slots for comparison
          const normalizedPrev = prev.map(slot => String(slot).trim());
          // Check if already exists (normalized comparison)
          const exists = normalizedPrev.some(slot => slot === bookedTimeNormalized);
          if (!exists) {
            // Return new array with the booked slot added
            return [...prev, bookedTimeNormalized];
          }
          return prev;
        });
        
        // Small delay to ensure React processes the state update before async operation
        await new Promise(resolve => setTimeout(resolve, 0));
        
        calendarEventId = await createCalendarEvent(formData, bookingId);
        toast.success('Calendar event created');
        
        // Refresh booked slots from calendar after a delay to sync with API
        // This ensures we have the most up-to-date list from the API
        if (formData.date) {
          // Use a delay to ensure calendar API has fully processed the event
          setTimeout(async () => {
            try {
              const updatedSlots = await getAvailableSlots(formData.date!);
              // Replace with API response - the API should now include the newly created event
              // If the event hasn't propagated yet, ensure we still include the booked slot
              const normalizedApiSlots = updatedSlots.map((slot: string) => slot.trim());
              const slotExistsInAPI = normalizedApiSlots.includes(bookedTimeNormalized);
              
              if (slotExistsInAPI) {
                // API has the slot, use API data directly
                setBookedSlots(normalizedApiSlots);
              } else {
                // API doesn't have it yet (propagation delay), merge with optimistic update
                setBookedSlots((prev) => {
                  const normalizedPrev = prev.map(slot => String(slot).trim());
                  const allSlots = [...normalizedApiSlots, ...normalizedPrev, bookedTimeNormalized];
                  return [...new Set(allSlots)];
                });
              }
            } catch (error) {
              // If refresh fails, ensure the booked slot stays in the list
              console.error('Error refreshing slots after booking:', error);
              setBookedSlots((prev) => {
                const normalizedPrev = prev.map(slot => String(slot).trim());
                const exists = normalizedPrev.some(slot => slot === bookedTimeNormalized);
                if (!exists) {
                  return [...prev, bookedTimeNormalized];
                }
                return prev;
              });
            }
          }, 2000); // 2 second delay to allow calendar API to fully propagate the event
        }
      } catch (error) {
        console.error('Calendar event creation failed:', error);
        toast.error('Failed to create calendar event, but booking will continue');
      }

      // Send confirmation email
      try {
        await sendConfirmationEmail({
          bookingId,
          appointmentType: formData.appointmentType as 'online' | 'offline',
          parentFirstName: formData.parentFirstName,
          parentLastName: formData.parentLastName,
          childFirstName: formData.childFirstName,
          childLastName: formData.childLastName,
          age: formData.age,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
          visitedBefore: formData.visitedBefore,
          patientCode: formData.patientCode,
          appointmentDate: formData.date!,
          appointmentTime: formData.time,
          status: 'confirmed'
        });
        toast.success('Confirmation email sent');
      } catch (error) {
        console.error('Email sending failed:', error);
        toast.error('Failed to send confirmation email, but booking is confirmed');
      }

      // Append to Google Sheets
      try {
        await appendBookingToSheet({
          bookingId,
          appointmentType: formData.appointmentType as 'online' | 'offline',
          parentFirstName: formData.parentFirstName,
          parentLastName: formData.parentLastName,
          childFirstName: formData.childFirstName,
          childLastName: formData.childLastName,
          age: formData.age,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
          visitedBefore: formData.visitedBefore,
          patientCode: formData.patientCode,
          appointmentDate: formData.date!,
          appointmentTime: formData.time,
          status: 'confirmed'
        });
        toast.success('Booking logged to system');
      } catch (error) {
        console.error('Sheet append failed:', error);
        toast.error('Failed to log booking, but appointment is confirmed');
      }

      // Set confirmation data
      setBookingConfirmation({
        bookingId,
        appointmentType: formData.appointmentType as 'online' | 'offline',
        parentFirstName: formData.parentFirstName,
        parentLastName: formData.parentLastName,
        childFirstName: formData.childFirstName,
        childLastName: formData.childLastName,
        age: formData.age,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        visitedBefore: formData.visitedBefore,
        patientCode: formData.patientCode,
        appointmentDate: formData.date!,
        appointmentTime: formData.time,
        status: 'confirmed'
      });

      setStep('confirmation');
      toast.success('Appointment booked successfully!');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to complete booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    // Store the current date before clearing form
    const currentDate = formData.date;
    
    // Clear all form data and state
    setFormData({
      appointmentType: '',
      parentFirstName: '',
      parentLastName: '',
      childFirstName: '',
      childLastName: '',
      age: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      reason: '',
      visitedBefore: false,
      patientCode: '',
      date: null,
      time: ''
    });
    setErrors({});
    // Don't clear bookedSlots here - preserve them so recently booked slots stay hidden
    // They will be cleared when a new date is selected or appointment type changes
    setStep('form');
    setBookingConfirmation(null);
    // Note: When user selects a date again, the useEffect will merge API slots with existing bookedSlots
  };

  if (step === 'confirmation' && bookingConfirmation) {
    return (
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#3a3a3a',
              border: '1px solid rgba(107,77,124,0.2)',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#6B4D7C',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#d4183d',
                secondary: '#fff',
              },
            },
          }}
        />
        <BookingConfirmation
          bookingData={bookingConfirmation}
          onBookAnother={handleBookAnother}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F9] py-16 px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#3a3a3a',
            border: '1px solid rgba(107,77,124,0.2)',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#6B4D7C',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#d4183d',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Book Appointment</span>
          </div>
          <h1 className="text-4xl text-[#3a3a3a] mb-4">Schedule Your Visit</h1>
          <p className="text-lg text-[#7a7a7a] max-w-2xl mx-auto mb-6">
            Fill in the details below to book an appointment with Dr. Vinay H. Joshi at Milestones Child Clinic
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-3xl border border-[rgba(107,77,124,0.1)] p-8 shadow-lg">
            <h2 className="text-2xl text-[#3a3a3a] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#6B4D7C]" />
              Patient Information
            </h2>
            <BookingForm
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>

          <div className="bg-white rounded-3xl border border-[rgba(107,77,124,0.1)] p-8 shadow-lg">
            <h2 className="text-2xl text-[#3a3a3a] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#6B4D7C]" />
              Select Date & Time
            </h2>
            <div className="space-y-8">
              <AppointmentTypeSelector
                appointmentType={formData.appointmentType}
                onTypeSelect={handleAppointmentTypeSelect}
                error={errors.appointmentType}
              />
              
              <DatePicker
                selectedDate={formData.date}
                onDateSelect={handleDateSelect}
                appointmentType={formData.appointmentType}
                error={errors.date}
              />
              
              <TimeSlotSelector
                selectedDate={formData.date}
                selectedTime={formData.time}
                onTimeSelect={handleTimeSelect}
                bookedSlots={bookedSlots}
                error={errors.time}
                isLoading={isLoadingSlots}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid(formData)}
              className={`
                px-8 py-4 rounded-full font-medium transition-all flex items-center gap-3
                ${isSubmitting || !isFormValid(formData)
                  ? 'bg-[#9a9a9a] text-white cursor-not-allowed'
                  : 'bg-[#6B4D7C] text-white hover:bg-[#5a3d6a] shadow-[0_8px_30px_rgba(107,77,124,0.3)] hover:shadow-[0_12px_40px_rgba(107,77,124,0.4)]'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Booking Appointment...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Confirm Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

