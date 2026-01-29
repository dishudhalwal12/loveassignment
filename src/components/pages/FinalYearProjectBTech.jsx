import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../layout/SEO';

const FinalYearProjectBTech = () => {
  return (
    <>
      <SEO 
        title="Final Year Project for B.Tech Students | Love Assignment"
        description="Innovative B.Tech Computer Science projects with AI, ML, Web Dev, and Blockchain. Complete code, documentation, and viva support."
        path="/final-year-project-btech"
      />
      
      <div className="section-container py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Final Year Project for B.Tech Students
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Looking for an innovative B.Tech final year project? Love Assignment provides cutting-edge projects for B.Tech Computer Science and IT students with complete implementation, documentation, and viva preparation.
          </p>
          
          <p>
            Our B.Tech projects cover trending domains including Artificial Intelligence, Machine Learning, Deep Learning, Blockchain, IoT, Cloud Computing, and Full-Stack Development. Each project is built with industry-standard practices.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What's Included:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Industry-grade source code with documentation</li>
            <li>Complete project report with diagrams (DFD, ER, UML)</li>
            <li>Synopsis and PPT presentation</li>
            <li>Base paper and research reference (if needed)</li>
            <li>Viva Q&A preparation with topic-specific questions</li>
            <li>Remote setup and execution support</li>
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

export default FinalYearProjectBTech;
