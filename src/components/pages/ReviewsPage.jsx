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
        <Testimonials />
      </div>
    </>
  );
};

export default ReviewsPage;
