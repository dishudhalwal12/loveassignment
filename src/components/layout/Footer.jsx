import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/apple-touch-icon.png" alt="Love Assignment Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-gray-900">Love Assignment</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Making final year projects stress-free for students across the globe. Premium quality, academic integrity, and on-time delivery.
            </p>
            {/* Geo Tagging */}
            <div className="hidden">
              <meta name="geo.region" content="IN" />
              <meta name="geo.placename" content="India" />
              <meta name="language" content="en-IN" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Service</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/bca-projects" className="hover:text-brand-700">BCA Projects</Link></li>
              <li><Link to="/mca-projects" className="hover:text-brand-700">MCA Projects</Link></li>
              <li><Link to="/btech-projects" className="hover:text-brand-700">B.Tech Projects</Link></li>
              <li><Link to="/project-reports" className="hover:text-brand-700">Report Writing</Link></li>
              <li><Link to="/viva-preparation" className="hover:text-brand-700">Viva Preparation</Link></li>
              <li><a href="/final-year-project-bca" className="hover:text-brand-700">Final Year BCA</a></li>
              <li><a href="/final-year-project-mca" className="hover:text-brand-700">Final Year MCA</a></li>
              <li><a href="/final-year-project-btech" className="hover:text-brand-700">Final Year B.Tech</a></li>
              <li><a href="/project-viva-preparation" className="hover:text-brand-700">Viva Prep Guide</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/services" className="hover:text-brand-700">Services</a></li>
              <li><a href="/reviews" className="hover:text-brand-700">Reviews</a></li>
              <li><a href="/faq" className="hover:text-brand-700">FAQ</a></li>
              <li><a href="#contact" className="hover:text-brand-700">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Need help? Chat with us</li>
              <li><a href="https://wa.me/919256487182" className="text-green-600 font-bold hover:text-green-700 hover:underline flex items-center gap-1">
                WhatsApp Support
              </a></li>
              <li className="pt-2">support@loveassignment.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Love Assignment. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-brand-700 fill-brand-700" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

