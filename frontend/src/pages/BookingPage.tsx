import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { BookingForm } from '../components/booking/BookingForm';
import { DatePicker } from '../components/booking/DatePicker';
import { TimeSlotSelector } from '../components/booking/TimeSlotSelector';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BookingFormData, BookingConfirmation as BookingConfirmationType, FormErrors } from '../types/booking.types';
import { validateBookingForm, isFormValid } from '../utils/validation';
import { generateBookingId } from '../utils/formatters';
import { createCalendarEvent, getAvailableSlots } from '../services/googleCalendar';
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
    parentName: '',
    childName: '',
    age: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    reason: '',
    date: null,
    time: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch available slots when date changes
  useEffect(() => {
    if (formData.date) {
      setIsLoadingSlots(true);
      getAvailableSlots(formData.date)
        .then((slots) => {
          setBookedSlots(slots);
        })
        .catch((error) => {
          console.error('Error fetching slots:', error);
          toast.error('Unable to fetch available slots. Please try again.');
          setBookedSlots([]);
        })
        .finally(() => {
          setIsLoadingSlots(false);
        });
    } else {
      setBookedSlots([]);
    }
  }, [formData.date]);

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
    handleFieldChange('date', date);
    handleFieldChange('time', ''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    handleFieldChange('time', time);
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
        calendarEventId = await createCalendarEvent(formData, bookingId);
        toast.success('Calendar event created');
      } catch (error) {
        console.error('Calendar event creation failed:', error);
        toast.error('Failed to create calendar event, but booking will continue');
      }

      // Send confirmation email
      try {
        await sendConfirmationEmail({
          bookingId,
          parentName: formData.parentName,
          childName: formData.childName,
          age: formData.age,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
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
          parentName: formData.parentName,
          childName: formData.childName,
          age: formData.age,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
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
        parentName: formData.parentName,
        childName: formData.childName,
        age: formData.age,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
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
    setFormData({
      parentName: '',
      childName: '',
      age: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      reason: '',
      date: null,
      time: ''
    });
    setErrors({});
    setStep('form');
    setBookingConfirmation(null);
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
              <DatePicker
                selectedDate={formData.date}
                onDateSelect={handleDateSelect}
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

