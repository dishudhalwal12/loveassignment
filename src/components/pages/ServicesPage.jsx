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
        <Services />
      </div>
    </>
  );
};

export default ServicesPage;
