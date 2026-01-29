import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../layout/SEO';

const ProjectVivaPreparation = () => {
  return (
    <>
      <SEO 
        title="Project Viva Preparation | Love Assignment"
        description="Comprehensive viva preparation for final year projects. Get curated Q&A, mock viva sessions, and expert guidance for BCA, MCA, B.Tech vivas."
        path="/project-viva-preparation"
      />
      
      <div className="section-container py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Project Viva Preparation
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Worried about your final year project viva? Love Assignment provides comprehensive viva preparation with curated Q&A banks specific to your project topic, technology stack, and university requirements.
          </p>
          
          <p>
            Our viva preparation covers theoretical concepts, project implementation details, code walkthrough, and commonly asked questions by examiners. We ensure you present your project with confidence.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Viva Preparation Includes:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Topic-specific viva questions and answers</li>
            <li>Technology stack Q&A (frameworks, databases, tools)</li>
            <li>Project flow and architecture explanation</li>
            <li>Code walkthrough preparation</li>
            <li>Common examiner questions and best answers</li>
            <li>Tips for confident presentation</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Who Is This For?</h2>
          <p>
            Perfect for BCA, MCA, B.Tech, and Diploma students who want to ace their final year project viva. Whether you built the project yourself or got help from us, our viva prep ensures you understand and present it perfectly.
          </p>
          
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

export default ProjectVivaPreparation;
