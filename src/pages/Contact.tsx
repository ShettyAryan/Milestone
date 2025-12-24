import { MapPin, Phone, Mail, Clock, MessageCircle, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What age groups do you treat?",
    answer: "We provide comprehensive care for children from birth through adolescence (0-18 years). Dr. Joshi specializes in neonatal and pediatric care."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major insurance plans. Please contact our office to verify your specific insurance coverage."
  },
  {
    question: "How do I schedule an appointment?",
    answer: "You can schedule an appointment by calling us at +91 98765 43210, using our online booking system, or requesting a callback through this page."
  },
  {
    question: "What should I bring to my first visit?",
    answer: "Please bring your child's insurance card, any previous medical records, vaccination records, and a list of current medications."
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, we have 24/7 emergency support available. For urgent concerns, please call our emergency line at +91 98765 43211."
  },
  {
    question: "How often should my child have check-ups?",
    answer: "We recommend well-child visits at regular intervals: frequent visits in the first year, then annually. We'll provide a personalized schedule based on your child's needs."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[rgba(107,77,124,0.2)] rounded-2xl overflow-hidden">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[rgba(107,77,124,0.05)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#3a3a3a] pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-[#6B4D7C] flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-[#7a7a7a] text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="pt-8">
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
              <span className="text-sm text-[#6B4D7C]">Get In Touch</span>
            </div>
            <h2 className="text-[#3a3a3a] mb-4">Contact Us</h2>
            <p className="text-[#7a7a7a] max-w-3xl mx-auto">
              We're here to answer your questions and schedule appointments.
              Reach out to us today.
            </p>
          </div>

          {/* Schedule Appointment Form */}
          <div className="bg-[#FFF8F9] rounded-3xl p-8 border border-[rgba(107,77,124,0.1)] mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#6B4D7C]" />
              </div>
              <h3 className="text-[#3a3a3a]">Schedule Appointment</h3>
            </div>
            <p className="text-[#7a7a7a] text-sm mb-6">
              Fill in your details and we'll call you back to schedule your
              appointment
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="parentName"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Parent Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="childName"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    id="childName"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="Child's name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label
                    htmlFor="childAge"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Child's Age
                  </label>
                  <input
                    type="text"
                    id="childAge"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="e.g., 2 years 6 months"
                  />
                </div>
                <div>
                  <label
                    htmlFor="childDOB"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Child's DOB
                  </label>
                  <input
                    type='date'
                    id="childAge"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="e.g., 2 years 6 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Preferred Call Time *
                  </label>
                  <select
                    id="preferredTime"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 6 PM)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm text-[#3a3a3a] mb-2"
                  >
                    Reason for Visit
                  </label>
                  <input
                    type="text"
                    id="reason"
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(107,77,124,0.2)] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4D7C] focus:border-transparent"
                    placeholder="Brief description of your concern"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[#3a3a3a] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#6B4D7C]" />
                  </div>
                  <div>
                    <h4 className="text-[#3a3a3a] mb-1">Clinic Address</h4>
                    <p className="text-[#7a7a7a] text-sm">
                      Milestones Child Clinic
                      <br />
                      123 Marine Drive, Churchgate
                      <br />
                      Mumbai, Maharashtra 400020
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#6B4D7C]" />
                  </div>
                  <div>
                    <h4 className="text-[#3a3a3a] mb-1">Phone Numbers</h4>
                    <p className="text-[#7a7a7a] text-sm">
                      Main: +91 98765 43210
                      <br />
                      Emergency: +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#6B4D7C]" />
                  </div>
                  <div>
                    <h4 className="text-[#3a3a3a] mb-1">Email</h4>
                    <p className="text-[#7a7a7a] text-sm">
                      info@milestoneschildclinic.com
                      <br />
                      dr.joshi@milestoneschildclinic.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#6B4D7C]" />
                  </div>
                  <div>
                    <h4 className="text-[#3a3a3a] mb-1">Clinic Hours</h4>
                    <p className="text-[#7a7a7a] text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: By Appointment Only
                      <br />
                      Emergency: 24/7 Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[rgba(107,77,124,0.15)] shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8284855221186!2d72.8297091!3d19.1151788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9dd3461d9c1%3A0xa3b41636086d822d!2sPrinceton%20building!5e0!3m2!1sen!2sin!4v1766335789147!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Milestones Child Clinic Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#FFF8F9]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
              <span className="text-sm text-[#6B4D7C]">
                Questions & Answers
              </span>
            </div>
            <h2 className="text-[#3a3a3a] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#7a7a7a] max-w-2xl mx-auto">
              Find answers to common questions about our services, appointments,
              and patient care
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-[#7a7a7a] text-sm">
              Still have questions?{" "}
              <a
                href="tel:+919876543210"
                className="text-[#6B4D7C] hover:underline"
              >
                Call us at +91 98765 43210
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}