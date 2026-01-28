import React from 'react';
import HeroConfigurator from '../sections/HeroConfigurator';
import TrustStats from '../sections/TrustStats';
import ProcessTimeline from '../sections/ProcessTimeline';
import GlobalReach from '../sections/GlobalReach';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import SEO from '../layout/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Love Assignment | Final Year Project Help for BCA MCA B.Tech"
        description="Love Assignment provides complete final year projects with code, report and viva support. Trusted by 2000+ students. First draft delivered in under 16 hours. Book now."
      >
        {/* Product Schema for Homepage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Final Year Project Bundle",
            "description": "Complete final year project with code, report, and viva support for BCA, MCA, B.Tech students",
            "brand": {
              "@type": "Brand",
              "name": "Love Assignment"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "3999",
              "highPrice": "7999",
              "offerCount": "3"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2000",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      </SEO>

      <HeroConfigurator />
      <TrustStats />
      <ProcessTimeline />
      <GlobalReach />
      <Services />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
