"use client";
import { useState } from "react";
import LandingPage from "@/components/landing-page";
import { Dashboard } from "@/components/dashboard";
import { SendMoney } from "@/components/send-money";
import { BeneficiaryManagement } from "@/components/beneficiary-management";
import { CurrencyConversion } from "@/components/currency-conversion";
import { CollectionOfFunds } from "@/components/collection-of-funds";
import { AdvancedAnalytics } from "@/components/advanced-analytics";
import { PWANavbar } from "@/components/pwa-navbar";
import { Sidebar } from "@/components/sidebar";
import { AnimatePresence, motion } from "motion/react";
import type { Screen } from "@/types";

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'pwa'>('landing');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEnterPWA = () => {
    setCurrentView('pwa');
    setCurrentScreen('dashboard');
  };

  const handleReturnToLanding = () => {
    setCurrentView('landing');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPWAScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'send':
        return <SendMoney onNavigate={handleNavigate} />;
      case 'beneficiaries':
        return <BeneficiaryManagement onNavigate={handleNavigate} />;
      case 'conversion':
        return <CurrencyConversion onNavigate={handleNavigate} />;
      case 'collect':
        return <CollectionOfFunds onNavigate={handleNavigate} />;
      case 'analytics':
        return <AdvancedAnalytics onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnterPWA={handleEnterPWA} />
        </motion.div>
      ) : (
        <motion.div
          key="pwa"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#0D1311] to-[#101614]"
        >
          <PWANavbar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onMenuClick={handleMenuClick}
            onReturnToLanding={handleReturnToLanding}
          />
          
          <div className="flex">
            <Sidebar
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onReturnToLanding={handleReturnToLanding}
            />
            
            <main className="flex-1 lg:ml-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderPWAScreen()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
