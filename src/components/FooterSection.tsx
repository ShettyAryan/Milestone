import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export function FooterSection() {
  return (
    <footer className="bg-gradient-to-b from-[#6B4D7C] to-[#5a3d6a] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[rgba(207,237,234,0.1)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[rgba(255,255,255,0.05)] rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo className="text-white" />
            </div>
            <p className="text-[rgba(255,255,255,0.8)] mb-6 leading-relaxed text-base">
              At Milestones Child Clinic, we celebrate every heartbeat, every giggle, and every milestone your child achieves.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(207,237,234,0.3)] flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(207,237,234,0.3)] flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(207,237,234,0.3)] flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-[rgba(255,255,255,0.8)] hover:text-[#CFEDEA] transition-colors text-base">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-[rgba(255,255,255,0.8)] hover:text-[#CFEDEA] transition-colors text-base">
                  About Dr. Joshi
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(255,255,255,0.8)] hover:text-[#CFEDEA] transition-colors text-base">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[rgba(255,255,255,0.8)] hover:text-[#CFEDEA] transition-colors text-base">
                  Clinic
                </a>
              </li>
              <li>
                <a href="#blog" className="text-[rgba(255,255,255,0.8)] hover:text-[#CFEDEA] transition-colors text-base">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  Newborn Care
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  Well-Child Visits
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  Vaccinations
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  Sick Visits
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#CFEDEA] flex-shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)]">
                  Milestones Child Clinic<br />Mumbai, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#CFEDEA] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#CFEDEA] flex-shrink-0" />
                <a href="mailto:info@milestonesclinic.com" className="text-[rgba(255,255,255,0.7)] hover:text-[#CFEDEA] transition-colors">
                  info@milestonesclinic.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.1)] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[rgba(255,255,255,0.6)] text-sm">
              © 2025 Milestone Pediatrics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[rgba(255,255,255,0.6)] hover:text-[#CFEDEA] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[rgba(255,255,255,0.6)] hover:text-[#CFEDEA] text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}