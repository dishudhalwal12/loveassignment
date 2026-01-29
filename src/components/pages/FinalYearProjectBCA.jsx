import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../layout/SEO';

const FinalYearProjectBCA = () => {
  return (
    <>
      <SEO 
        title="Final Year Project for BCA Students | Love Assignment"
        description="Get complete BCA final year projects with source code, documentation, and viva preparation. Trusted by 2000+ BCA students across India."
        path="/final-year-project-bca"
      />
      
      <div className="section-container py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Final Year Project for BCA Students
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Looking for a complete BCA final year project? Love Assignment provides ready-to-submit projects with source code, detailed documentation, and comprehensive viva preparation tailored specifically for BCA students.
          </p>
          
          <p>
            Our BCA projects cover popular technologies including Java, Python, PHP, MySQL, React, and more. Each project is built uniquely with 100% working code that runs on your laptop with our remote setup support.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What's Included:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Complete source code with clean architecture</li>
            <li>Project report, SRS, and documentation</li>
            <li>Synopsis and PPT presentation</li>
            <li>Viva Q&A preparation kit</li>
            <li>Remote setup assistance via TeamViewer/AnyDesk</li>
          </ul>
          
          <p className="mt-8">
            <Link to="/" className="text-brand-700 hover:text-brand-800 font-semibold underline">
              ← Back to Homepage to Book Your Project
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default FinalYearProjectBCA;
