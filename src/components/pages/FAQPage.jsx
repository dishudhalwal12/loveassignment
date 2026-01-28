import React from 'react';
import FAQ from '../sections/FAQ';
import SEO from '../layout/SEO';

const FAQPage = () => {
  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Love Assignment" 
        description="Got questions about your final year project? Find answers about delivery time, payment security, code uniqueness, and viva support here."
        path="/faq"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does booking work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Select your team size, fill details, and pay securely. Our team confirms via WhatsApp."
                }
              },
              {
                "@type": "Question",
                "name": "Is each project unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Every project code and report is built freshly for each student."
                }
              },
              {
                "@type": "Question",
                "name": "How fast is delivery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "First working draft is delivered within 16 hours."
                }
              }
            ]
          })}
        </script>
      </SEO>
      <div className="pt-8">
        <div className="section-container mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Everything you need to know about our final year project services
          </p>
        </div>
        <FAQ />
      </div>
    </>
  );
};

export default FAQPage;
