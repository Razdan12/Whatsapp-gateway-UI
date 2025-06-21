import NavbarHome from '../components/homescreen/NavbarHome';
import Hero from '../components/homescreen/Hero';
import WorksSection from '../components/homescreen/WorksSection';
import Feature from '../components/homescreen/Feature';
import Testimonial from '../components/homescreen/Testimonial';
import Pricing from '../components/homescreen/Pricing';
import Faq from '../components/homescreen/Faq';
import Cta from '../components/homescreen/Cta';
import Footer from '../components/homescreen/Footer';
import { useEffect, useState } from 'react';

export default function HomePage() {
 
  return (
    
    <div className="min-h-screen bg-base-100 text-foreground" data-theme="synthwave" >
     
      <div className="sticky top-0 z-50">
        <NavbarHome/>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <WorksSection />

      {/* Features Section */}
      <Feature />

      {/* Testimonials */}
      <Testimonial />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <Faq />

      {/* CTA Section */}
      <Cta />

      {/* Footer */}
      <Footer />
    </div>
  );
}
