import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,248,249,0.95)] backdrop-blur-md border-b border-[rgba(107,77,124,0.1)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                isActive('/') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm transition-colors ${
                isActive('/about') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
              }`}
            >
              About
            </Link>
            <Link 
              to="/clinic" 
              className={`text-sm transition-colors ${
                isActive('/clinic') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
              }`}
            >
              Clinic
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm transition-colors ${
                isActive('/blog') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm transition-colors ${
                isActive('/contact') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-[#6B4D7C] text-white text-sm rounded-full hover:bg-[#5a3d6a] transition-colors">
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-[#3a3a3a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-[rgba(107,77,124,0.1)]">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-sm transition-colors py-2 ${
                  isActive('/') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm transition-colors py-2 ${
                  isActive('/about') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/clinic" 
                className={`text-sm transition-colors py-2 ${
                  isActive('/clinic') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Clinic
              </Link>
              <Link 
                to="/blog" 
                className={`text-sm transition-colors py-2 ${
                  isActive('/blog') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm transition-colors py-2 ${
                  isActive('/contact') ? 'text-[#6B4D7C]' : 'text-[#7a7a7a] hover:text-[#6B4D7C]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-[rgba(107,77,124,0.1)]">
                <button className="px-6 py-3 bg-[#6B4D7C] text-white text-sm rounded-full hover:bg-[#5a3d6a] transition-colors">
                  Book Appointment
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}