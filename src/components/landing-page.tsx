"use client";
import { motion } from 'motion/react';
import { Navbar } from './navbar';
import { HeroSection } from './hero-section';
import { CoreValueSection } from './core-value-section';
import { NoPlatformFeeSection } from './no-platform-fee-section';
import { GlobalBankingSection } from './global-banking-section';
import { SafetySecuritySection } from './safety-security-section';
import { DataPrivacySection } from './data-privacy-section';
import { TestimonialsSection } from './testimonials-section';
import { CtaSection } from './cta-section';
import { Footer } from './footer';

interface LandingPageProps {
  onEnterPWA?: () => void;
}

export function LandingPage({ onEnterPWA }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen font-general-sans"
    >
      <Navbar onEnterPWA={onEnterPWA} />
      <HeroSection onEnterPWA={onEnterPWA} />
      <CoreValueSection onEnterPWA={onEnterPWA} />
      <NoPlatformFeeSection />
      <GlobalBankingSection />
      <SafetySecuritySection />
      <DataPrivacySection />
      <TestimonialsSection />
      <CtaSection onEnterPWA={onEnterPWA} />
      <Footer />
    </motion.div>
  );
}

export default LandingPage;