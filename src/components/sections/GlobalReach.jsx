import React from 'react';
import { Globe } from 'lucide-react';

const countries = [
  { name: 'India', code: '🇮🇳' },
  { name: 'United Kingdom', code: '🇬🇧' },
  { name: 'Australia', code: '🇦🇺' },
  { name: 'Germany', code: '🇩🇪' },
];

const colleges = [
  "Delhi University", "IPU", "Amity University",
  "Mumbai University", "LPU", "Chandigarh University"
];

const GlobalReach = () => {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        
        {/* Countries */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>International Standards</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Serving Students Worldwide</h2>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {countries.map((country) => (
              <div key={country.code} className="flex flex-col items-center gap-3">
                <div className="w-16 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-2xl border border-gray-100 relative group hover:-translate-y-1 transition-transform">
                   <span role="img" aria-label={country.name}>{country.code}</span>
                </div>
                <span className="font-medium text-gray-500 text-sm">{country.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colleges Strip */}
        <div className="border-t border-gray-100 pt-16">
          <p className="text-center text-gray-500 font-medium mb-8">Trusted by students from top universities</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {colleges.map((college, idx) => (
               <span key={idx} className="text-lg md:text-xl font-bold text-gray-600 font-serif">
                 {college}
               </span>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalReach;
