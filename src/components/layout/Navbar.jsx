import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import TopAnnouncementBar from './TopAnnouncementBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <TopAnnouncementBar />
      </div>
      <nav className="fixed top-8 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/apple-touch-icon.png" alt="Love Assignment Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">Love Assignment</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`transition-colors font-medium text-sm ${
                    isActive(link.path) ? 'text-brand-700' : 'text-gray-600 hover:text-brand-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="#contact" className="text-gray-600 hover:text-brand-700 transition-colors font-medium text-sm">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-brand-700 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-3 rounded-md font-medium ${
                    isActive(link.path) ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact"
                className="block px-3 py-3 text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

