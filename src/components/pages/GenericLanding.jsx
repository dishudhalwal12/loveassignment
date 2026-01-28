import React from 'react';
import HeroConfigurator from '../sections/HeroConfigurator';
import TrustStats from '../sections/TrustStats';
import ProcessTimeline from '../sections/ProcessTimeline';
import GlobalReach from '../sections/GlobalReach';
import SEO from '../layout/SEO';

const GenericLanding = ({ 
  pageTitle, 
  metaDescription, 
  heroOverrideTitle,
  path,
  image
}) => {
  return (
    <>
      <SEO 
        title={pageTitle}
        description={metaDescription}
        path={path}
        image={image}
      />

      <HeroConfigurator overrideTitle={heroOverrideTitle} />
      <TrustStats />
      <ProcessTimeline />
      <GlobalReach />
    </>
  );
};

export default GenericLanding;
