import { Clock } from 'lucide-react';
import { generateTimeSlots, formatTimeDisplay, isTimeSlotInPast } from '../../utils/dateHelpers';
import { TimeSlot } from '../../types/booking.types';

interface TimeSlotSelectorProps {
  selectedDate: Date | null;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  bookedSlots?: string[];
  error?: string;
  isLoading?: boolean;
}

export function TimeSlotSelector({
  selectedDate,
  selectedTime,
  onTimeSelect,
  bookedSlots = [],
  error,
  isLoading = false
}: TimeSlotSelectorProps) {
  const timeSlots = generateTimeSlots();

  const isSlotBooked = (time: string): boolean => {
    return bookedSlots.includes(time);
  };

  const isSlotSelected = (time: string): boolean => {
    return selectedTime === time;
  };

  const isSlotAvailable = (time: string): boolean => {
    // Check if slot is booked
    if (isSlotBooked(time)) {
      return false;
    }
    
    // Check if slot is in the past (for today's date)
    if (selectedDate && isTimeSlotInPast(selectedDate, time)) {
      return false;
    }
    
    return true;
  };

  if (!selectedDate) {
    return (
      <div className="w-full">
        <label className="block text-sm text-[#3a3a3a] mb-3 font-medium">
          Select Time
        </label>
        <div className="bg-[#f5f5f5] rounded-2xl border border-[rgba(107,77,124,0.1)] p-8 text-center">
          <Clock className="w-12 h-12 text-[#9a9a9a] mx-auto mb-3" />
          <p className="text-[#7a7a7a]">Please select a date first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="block text-sm text-[#3a3a3a] mb-3 font-medium">
        Select Time Slot
      </label>
      
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-[rgba(107,77,124,0.2)] p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[rgba(107,77,124,0.2)] border-t-[#6B4D7C] rounded-full animate-spin mb-3" />
          <p className="text-[#7a7a7a]">Loading available slots...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[rgba(107,77,124,0.2)] p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {timeSlots
              .filter((time) => isSlotAvailable(time)) // Only show available slots
              .map((time) => {
                const selected = isSlotSelected(time);

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => onTimeSelect(time)}
                    className={`
                      px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${selected
                        ? 'bg-[#6B4D7C] text-white shadow-md'
                        : 'bg-white text-[#3a3a3a] border-2 border-[#CFEDEA] hover:border-[#6B4D7C] hover:bg-[rgba(107,77,124,0.05)]'
                      }
                    `}
                  >
                    {formatTimeDisplay(time)}
                  </button>
                );
              })}
          </div>
          
          {/* Show message if no slots available */}
          {timeSlots.filter((time) => isSlotAvailable(time)).length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-[#9a9a9a] mx-auto mb-3" />
              <p className="text-[#7a7a7a]">No available time slots for this date</p>
              <p className="text-sm text-[#9a9a9a] mt-1">Please select another date</p>
            </div>
          )}

          {selectedTime && (
            <div className="mt-4 pt-4 border-t border-[rgba(107,77,124,0.1)]">
              <p className="text-sm text-[#7a7a7a]">
                Selected: <span className="text-[#6B4D7C] font-medium">{formatTimeDisplay(selectedTime)}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

