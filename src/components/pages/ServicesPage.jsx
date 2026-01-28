import React from 'react';
import Services from '../sections/Services';
import SEO from '../layout/SEO';

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Our Services | Final Year Project Support" 
        description="Explore our range of services: Full Code Implementation, Project Reports, synopses, and Viva Preparation for BCA, MCA, and B.Tech students."
        path="/services"
      />
      <div className="pt-8">
        <div className="section-container mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Complete final year project support from code to viva preparation
          </p>
        </div>
        <Services />
      </div>
    </>
  );
};

export default ServicesPage;
