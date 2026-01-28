import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  canonical = 'https://loveassignment.shop',
  path = '', 
  image,
  children 
}) => {
  const fullUrl = `${canonical}${path}`;
  const siteName = 'Love Assignment';
  const defaultDescription = 'Love Assignment provides complete final year projects with code, report and viva support. Trusted by 2000+ students. First draft delivered in under 16 hours.';
  const defaultImage = 'https://loveassignment.shop/og-image.jpg';
  const ogImage = image || defaultImage;

  // Structured Data: Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Love Assignment",
    "url": "https://loveassignment.shop",
    "logo": "https://loveassignment.shop/logo.png",
    "description": "Final year project assistance for BCA, MCA, and B.Tech students",
    "email": "support@loveassignment.in",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9256487182",
      "contactType": "customer support",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://wa.me/919256487182"
    ]
  };

  // Structured Data: Website Search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://loveassignment.shop",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://loveassignment.shop/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://loveassignment.shop"
      },
      ...(path ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title.split('|')[0].trim(),
        "item": fullUrl
      }] : [])
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data: Organization & Website (Global) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Additional Schemas passed as children */}
      {children}
    </Helmet>
  );
};

export default SEO;
