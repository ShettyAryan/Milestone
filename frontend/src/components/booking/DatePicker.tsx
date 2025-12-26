import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { isDateAvailable, formatDateDisplay } from '../../utils/dateHelpers';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  error?: string;
}

export function DatePicker({ selectedDate, onDateSelect, error }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (isDateAvailable(date)) {
      onDateSelect(date);
    }
  };

  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const todayCheck = new Date(today);
    todayCheck.setHours(0, 0, 0, 0);
    return checkDate < todayCheck;
  };

  const isSunday = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getDay() === 0;
  };

  return (
    <div className="w-full">
      <label className="block text-sm text-[#3a3a3a] mb-3 font-medium">
        Select Date
      </label>
      
      <div className="bg-white rounded-2xl border border-[rgba(107,77,124,0.2)] p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 rounded-lg hover:bg-[rgba(107,77,124,0.1)] transition-colors"
            type="button"
          >
            <ChevronLeft className="w-5 h-5 text-[#6B4D7C]" />
          </button>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#6B4D7C]" />
            <h3 className="text-lg text-[#3a3a3a] font-medium">
              {monthNames[currentMonth]} {currentYear}
            </h3>
          </div>
          
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-[rgba(107,77,124,0.1)] transition-colors"
            type="button"
          >
            <ChevronRight className="w-5 h-5 text-[#6B4D7C]" />
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-xs text-[#7a7a7a] font-medium py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentYear, currentMonth, day);
            const available = isDateAvailable(date);
            const selected = isSelected(day);
            const todayDate = isToday(day);
            const past = isPast(day);
            const sunday = isSunday(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={!available}
                className={`
                  aspect-square rounded-xl text-sm font-medium transition-all
                  ${selected
                    ? 'bg-[#6B4D7C] text-white shadow-md'
                    : todayDate
                    ? 'bg-[rgba(107,77,124,0.1)] text-[#6B4D7C] border-2 border-[#6B4D7C]'
                    : available
                    ? 'bg-white text-[#3a3a3a] border border-[rgba(107,77,124,0.2)] hover:bg-[rgba(107,77,124,0.1)] hover:border-[#6B4D7C]'
                    : 'bg-[#f5f5f5] text-[#9a9a9a] cursor-not-allowed'
                  }
                  ${sunday ? 'opacity-50' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-[rgba(107,77,124,0.1)]">
            <p className="text-sm text-[#7a7a7a]">
              Selected: <span className="text-[#6B4D7C] font-medium">{formatDateDisplay(selectedDate)}</span>
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

