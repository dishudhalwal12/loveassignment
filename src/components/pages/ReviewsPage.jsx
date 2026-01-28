import React from 'react';
import Testimonials from '../sections/Testimonials';
import SEO from '../layout/SEO';

const ReviewsPage = () => {
  return (
    <>
      <SEO 
        title="Student Reviews & Success Stories | Love Assignment" 
        description="Read what over 2000+ students say about Love Assignment. Real reviews from BCA, MCA, and B.Tech students from top universities across India."
        path="/reviews"
      />
      <div className="pt-8">
        <div className="section-container mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Student Success Stories
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            See what our 2000+ happy students have to say
          </p>
        </div>
        <Testimonials />
      </div>
    </>
  );
};

export default ReviewsPage;
