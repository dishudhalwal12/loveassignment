import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../layout/SEO';

const FinalYearProjectMCA = () => {
  return (
    <>
      <SEO 
        title="Final Year Project for MCA Students | Love Assignment"
        description="Premium MCA final year projects with IEEE standards, research paper support, and complete implementation. Trusted by MCA students worldwide."
        path="/final-year-project-mca"
      />
      
      <div className="section-container py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Final Year Project for MCA Students
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Need a high-quality MCA final year project? Love Assignment delivers premium projects built to IEEE standards with complete source code, research documentation, and viva preparation for MCA students.
          </p>
          
          <p>
            Our MCA projects feature advanced technologies including Machine Learning, AI, Cloud Computing, Blockchain, Data Science, and Full-Stack Web Development. Every project is unique and plagiarism-free.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What's Included:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Production-grade source code</li>
            <li>IEEE format project report and documentation</li>
            <li>Research paper support (optional)</li>
            <li>Synopsis, SRS, and PPT presentation</li>
            <li>Comprehensive viva Q&A preparation</li>
            <li>Remote setup and deployment support</li>
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

export default FinalYearProjectMCA;
