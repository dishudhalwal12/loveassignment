import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PricingProvider } from './context/PricingContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './components/pages/Home';
import GenericLanding from './components/pages/GenericLanding';
import ServicesPage from './components/pages/ServicesPage';
import TestimonialsPage from './components/pages/ReviewsPage';
import FAQPage from './components/pages/FAQPage';

// Programmatic SEO Landing Pages
import FinalYearProjectBCA from './components/pages/FinalYearProjectBCA';
import FinalYearProjectMCA from './components/pages/FinalYearProjectMCA';
import FinalYearProjectBTech from './components/pages/FinalYearProjectBTech';
import ProjectVivaPreparation from './components/pages/ProjectVivaPreparation';

function App() {
  return (
    <HelmetProvider>
      <PricingProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
            <Navbar />
            
            <main className="flex-grow pt-24">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Dedicated Landing Pages */}
                <Route path="/bca-projects" element={
                  <GenericLanding 
                    pageTitle="BCA Final Year Projects | Code + Report + Viva"
                    metaDescription="Download complete BCA final year projects with source code, documentation, and synopsis. Top rated support for BCA students."
                    heroOverrideTitle="BCA Project Bundle"
                    path="/bca-projects"
                  />
                } />
                <Route path="/mca-projects" element={
                  <GenericLanding 
                    pageTitle="MCA Final Year Projects | High Quality & Unique"
                    metaDescription="Premium MCA major projects with IEEE standards. Includes implementation, research paper support, and ppt."
                    heroOverrideTitle="MCA Project Bundle"
                    path="/mca-projects"
                  />
                } />
                <Route path="/btech-projects" element={
                  <GenericLanding 
                    pageTitle="B.Tech Computer Science Projects | Final Year"
                    metaDescription="Innovative B.Tech CS projects. AI, ML, Web Dev, Blockchain topics available with complete execution code."
                    heroOverrideTitle="B.Tech Project Bundle"
                    path="/btech-projects"
                  />
                } />
                <Route path="/project-reports" element={
                  <GenericLanding 
                    pageTitle="Final Year Project Reports & Documentation"
                    metaDescription="Get professionally written project reports, SRS, and design documents formatted for university submission."
                    heroOverrideTitle="Project Report Service"
                    path="/project-reports"
                  />
                } />
                <Route path="/viva-preparation" element={
                  <GenericLanding 
                    pageTitle="Viva Questions & Answers | Final Year Prep"
                    metaDescription="Prepare for your final year viva with our curated Q&A bank specific to your project topic."
                    heroOverrideTitle="Viva Preparation Kit"
                    path="/viva-preparation"
                  />
                } />

                {/* Static Pages */}
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/reviews" element={<TestimonialsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                {/* Programmatic SEO Landing Pages */}
                <Route path="/final-year-project-bca" element={<FinalYearProjectBCA />} />
                <Route path="/final-year-project-mca" element={<FinalYearProjectMCA />} />
                <Route path="/final-year-project-btech" element={<FinalYearProjectBTech />} />
                <Route path="/project-viva-preparation" element={<ProjectVivaPreparation />} />
                
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </PricingProvider>
    </HelmetProvider>
  );
}

// Helper to scroll to top on route change
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;

