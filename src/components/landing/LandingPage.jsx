import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import PartnersMarquee from './PartnersMarquee';
import LiveShowcaseSection from './LiveShowcaseSection';
import FeatureVisualGrid from './FeatureVisualGrid';
import ChemicalCalculator from './ChemicalCalculator';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import CTABanner from './CTABanner';
import LandingFooter from './LandingFooter';
import DemoVideoModal from './DemoVideoModal';

export default function LandingPage({ onLaunchApp }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleSelectFeature = (featId) => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EC] text-[#17372F] selection:bg-[#075C46]/20 selection:text-[#17372F] flex flex-col antialiased">
      {/* Top Glassmorphic Navigation Bar */}
      <LandingNavbar
        onLaunchApp={onLaunchApp}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Hero Section matching user reference wireframe & theme */}
      <HeroSection
        onLaunchApp={onLaunchApp}
        onOpenDemo={() => setDemoModalOpen(true)}
        onSelectFeature={handleSelectFeature}
      />

      {/* Industrial Chemical Partners & Port Terminals Marquee */}
      <PartnersMarquee />

      {/* Interactive Platform Simulation with Tabs */}
      <LiveShowcaseSection onLaunchApp={onLaunchApp} />

      {/* Visual Heavy Feature Grid with Glassmorphic Badges */}
      <FeatureVisualGrid onLaunchApp={onLaunchApp} />

      {/* Interactive Chemical Trade ROI & Margin Calculator */}
      <ChemicalCalculator onLaunchApp={onLaunchApp} />

      {/* Customer Success & Verified Testimonials */}
      <TestimonialsSection />

      {/* Transparent Tiered Pricing */}
      <PricingSection onLaunchApp={onLaunchApp} />

      {/* Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* High-Impact Glassmorphic CTA Banner */}
      <CTABanner
        onLaunchApp={onLaunchApp}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Comprehensive Footer */}
      <LandingFooter onLaunchApp={onLaunchApp} />

      {/* Interactive Demo Video / Walkthrough Modal */}
      <DemoVideoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onLaunchApp={onLaunchApp}
      />
    </div>
  );
}

