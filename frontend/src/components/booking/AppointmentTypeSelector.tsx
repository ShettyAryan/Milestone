import React from 'react';
import { Monitor, Building2 } from 'lucide-react';
import { FormErrors } from '../../types/booking.types';

interface AppointmentTypeSelectorProps {
  appointmentType: 'online' | 'offline' | '';
  onTypeSelect: (type: 'online' | 'offline') => void;
  error?: string;
}

export function AppointmentTypeSelector({
  appointmentType,
  onTypeSelect,
  error
}: AppointmentTypeSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm text-[#3a3a3a] mb-3 font-medium">
        Appointment Type <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onTypeSelect('online')}
          className={`
            p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3
            ${appointmentType === 'online'
              ? 'border-[#6B4D7C] bg-[rgba(107,77,124,0.1)] shadow-md'
              : 'border-[rgba(107,77,124,0.2)] bg-white hover:border-[#6B4D7C] hover:bg-[rgba(107,77,124,0.05)]'
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${appointmentType === 'online'
              ? 'bg-[#6B4D7C]'
              : 'bg-[rgba(107,77,124,0.1)]'
            }
          `}>
            <Monitor className={`w-6 h-6 ${appointmentType === 'online' ? 'text-white' : 'text-[#6B4D7C]'}`} />
          </div>
          <div className="text-center">
            <p className={`font-medium ${appointmentType === 'online' ? 'text-[#6B4D7C]' : 'text-[#3a3a3a]'}`}>
              Online
            </p>
            <p className="text-xs text-[#7a7a7a] mt-1">
              Mon, Tue, Wed, Thu, Fri, Sat
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onTypeSelect('offline')}
          className={`
            p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3
            ${appointmentType === 'offline'
              ? 'border-[#6B4D7C] bg-[rgba(107,77,124,0.1)] shadow-md'
              : 'border-[rgba(107,77,124,0.2)] bg-white hover:border-[#6B4D7C] hover:bg-[rgba(107,77,124,0.05)]'
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${appointmentType === 'offline'
              ? 'bg-[#6B4D7C]'
              : 'bg-[rgba(107,77,124,0.1)]'
            }
          `}>
            <Building2 className={`w-6 h-6 ${appointmentType === 'offline' ? 'text-white' : 'text-[#6B4D7C]'}`} />
          </div>
          <div className="text-center">
            <p className={`font-medium ${appointmentType === 'offline' ? 'text-[#6B4D7C]' : 'text-[#3a3a3a]'}`}>
              Offline
            </p>
            <p className="text-xs text-[#7a7a7a] mt-1">
              Tue, Thu, Sat
            </p>
          </div>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

