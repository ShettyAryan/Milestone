import { CheckCircle, Printer, Share2, Calendar, Clock, User, Baby, Mail, Phone, FileText } from 'lucide-react';
import { BookingConfirmation as BookingConfirmationType } from '../../types/booking.types';
import { formatDateDisplay, formatTimeDisplay } from '../../utils/dateHelpers';

interface BookingConfirmationProps {
  bookingData: BookingConfirmationType;
  onBookAnother: () => void;
}

export function BookingConfirmation({ bookingData, onBookAnother }: BookingConfirmationProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const message = `Appointment Confirmed!\n\nBooking ID: ${bookingData.bookingId}\nChild: ${bookingData.childName}\nDate: ${formatDateDisplay(bookingData.appointmentDate)}\nTime: ${formatTimeDisplay(bookingData.appointmentTime)}\n\nMilestones Child Clinic`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#6B4D7C] mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl text-[#3a3a3a] mb-3">Appointment Confirmed!</h1>
          <p className="text-lg text-[#7a7a7a]">
            Your appointment has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl border border-[rgba(107,77,124,0.1)] p-8 shadow-lg mb-6">
          {/* Booking ID */}
          <div className="text-center mb-8 pb-6 border-b border-[rgba(107,77,124,0.1)]">
            <p className="text-sm text-[#7a7a7a] mb-2">Booking ID</p>
            <p className="text-2xl font-bold text-[#6B4D7C]">{bookingData.bookingId}</p>
          </div>

          {/* Appointment Details */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Appointment Date</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {formatDateDisplay(bookingData.appointmentDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Appointment Time</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {formatTimeDisplay(bookingData.appointmentTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Parent Name</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {bookingData.parentName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <Baby className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Child Name</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {bookingData.childName}
                </p>
                <p className="text-sm text-[#7a7a7a] mt-1">
                  Age: {bookingData.age}
                </p>
                {bookingData.dateOfBirth && (
                  <p className="text-sm text-[#7a7a7a]">
                    Date of Birth: {new Date(bookingData.dateOfBirth).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Email</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {bookingData.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Phone</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {bookingData.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#6B4D7C]" />
              </div>
              <div>
                <p className="text-sm text-[#7a7a7a] mb-1">Reason for Visit</p>
                <p className="text-lg text-[#3a3a3a] font-medium">
                  {bookingData.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-[#FFF8F9] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
            <h3 className="text-lg text-[#3a3a3a] mb-4 font-medium">Clinic Information</h3>
            <div className="space-y-2 text-sm text-[#7a7a7a]">
              <p><strong className="text-[#3a3a3a]">Address:</strong> 123 Marine Drive, Churchgate, Mumbai, Maharashtra 400020</p>
              <p><strong className="text-[#3a3a3a]">Phone:</strong> +91 98765 43210</p>
              <p><strong className="text-[#3a3a3a]">Email:</strong> info@milestoneschildclinic.com</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[rgba(107,77,124,0.2)] text-[#6B4D7C] rounded-full hover:bg-[rgba(107,77,124,0.05)] transition-colors"
          >
            <Printer className="w-5 h-5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[rgba(107,77,124,0.2)] text-[#6B4D7C] rounded-full hover:bg-[rgba(107,77,124,0.05)] transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={onBookAnother}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Another</span>
          </button>
        </div>

        {/* Important Notes */}
        <div className="bg-[rgba(207,237,234,0.2)] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
          <h3 className="text-lg text-[#3a3a3a] mb-3 font-medium">Important Notes</h3>
          <ul className="space-y-2 text-sm text-[#7a7a7a]">
            <li className="flex items-start gap-2">
              <span className="text-[#6B4D7C] mt-1">•</span>
              <span>Please arrive 10 minutes before your appointment time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B4D7C] mt-1">•</span>
              <span>Bring your child's previous medical records if available.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B4D7C] mt-1">•</span>
              <span>If you need to reschedule or cancel, please call us at least 24 hours in advance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6B4D7C] mt-1">•</span>
              <span>A confirmation email has been sent to {bookingData.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

