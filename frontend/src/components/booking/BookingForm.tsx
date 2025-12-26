import React, { useState } from 'react';
import { User, Baby, Mail, Phone, FileText, Calendar } from 'lucide-react';
import { BookingFormData, FormErrors } from '../../types/booking.types';
import {
  validateParentName,
  validateChildName,
  validateAge,
  validateDateOfBirth,
  validateEmail,
  validatePhone,
  validateReason
} from '../../utils/validation';
import { formatPhoneNumber } from '../../utils/formatters';

interface BookingFormProps {
  formData: BookingFormData;
  errors: FormErrors;
  onFieldChange: (field: keyof BookingFormData, value: any) => void;
  onBlur?: (field: keyof BookingFormData) => void;
}

export function BookingForm({
  formData,
  errors,
  onFieldChange,
  onBlur
}: BookingFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof BookingFormData, value: any) => {
    onFieldChange(field, value);
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched({ ...touched, [field]: true });
    if (onBlur) {
      onBlur(field);
    }
  };

  return (
    <div className="space-y-6">
      {/* Parent Name */}
      <div>
        <label htmlFor="parentName" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Parent's Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="text"
            id="parentName"
            value={formData.parentName}
            onChange={(e) => handleChange('parentName', e.target.value)}
            onBlur={() => handleBlur('parentName')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.parentName && touched.parentName
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
            placeholder="Enter parent's full name"
          />
        </div>
        {errors.parentName && touched.parentName && (
          <p className="mt-1 text-sm text-red-500">{errors.parentName}</p>
        )}
      </div>

      {/* Child Name */}
      <div>
        <label htmlFor="childName" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Child's Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="text"
            id="childName"
            value={formData.childName}
            onChange={(e) => handleChange('childName', e.target.value)}
            onBlur={() => handleBlur('childName')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.childName && touched.childName
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
            placeholder="Enter child's full name"
          />
        </div>
        {errors.childName && touched.childName && (
          <p className="mt-1 text-sm text-red-500">{errors.childName}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Child's Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            onBlur={() => handleBlur('dateOfBirth')}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.dateOfBirth && touched.dateOfBirth
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
          />
        </div>
        {errors.dateOfBirth && touched.dateOfBirth && (
          <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Child's Age <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="text"
            id="age"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.age && touched.age
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
            placeholder="e.g., 5 years, 2 months"
          />
        </div>
        {errors.age && touched.age && (
          <p className="mt-1 text-sm text-red-500">{errors.age}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.email && touched.email
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7a7a]" />
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              handleChange('phone', formatted);
            }}
            onBlur={() => handleBlur('phone')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.phone && touched.phone
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent`}
            placeholder="+91 98765 43210"
            maxLength={17}
          />
        </div>
        {errors.phone && touched.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm text-[#3a3a3a] mb-2 font-medium">
          Reason for Visit <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-4 top-4 w-5 h-5 text-[#7a7a7a]" />
          <textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            onBlur={() => handleBlur('reason')}
            rows={4}
            maxLength={500}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              errors.reason && touched.reason
                ? 'border-red-500'
                : 'border-[rgba(107,77,124,0.2)]'
            } bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent resize-none`}
            placeholder="Please describe the reason for the visit..."
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          {errors.reason && touched.reason ? (
            <p className="text-sm text-red-500">{errors.reason}</p>
          ) : (
            <div />
          )}
          <p className="text-xs text-[#7a7a7a]">
            {formData.reason.length}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
}

