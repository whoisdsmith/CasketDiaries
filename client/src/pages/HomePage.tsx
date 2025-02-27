import { useState, useEffect } from 'react';
import ParticleSystem from '@/components/common/ParticleSystem';
import InitialLanding from '@/components/landing/InitialLanding';
import Header from '@/components/landing/Header';
import MainNavigation from '@/components/landing/MainNavigation';
import MobileNavigation from '@/components/landing/MobileNavigation';
import MeetingPointSection from '@/components/sections/MeetingPointSection';
import CrucibleSection from '@/components/sections/CrucibleSection';
import SideBySideSection from '@/components/sections/SideBySideSection';
import EternalLightSection from '@/components/sections/EternalLightSection';
import NewsletterForm from '@/components/common/NewsletterForm';
import Footer from '@/components/common/Footer';

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState('meeting-point');
  
  const handleInitialLandingComplete = () => {
    setShowContent(true);
    
    // Create required keyframes for animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: #E6C200 }
      }
      @keyframes rain {
        0% { background-position: 0 0, 0 0; }
        100% { background-position: 0 5px, 0 200px; }
      }
      @keyframes fogMove {
        0% { transform: translateX(-5%) translateY(0); }
        50% { transform: translateX(5%) translateY(-5%); }
        100% { transform: translateX(-5%) translateY(-10%); }
      }
      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes pulse {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 0.7; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(styleElement);
  };

  const handleSectionVisible = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add smooth scroll functionality
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="bg-[#1D1D1D] min-h-screen overflow-x-hidden">
      <InitialLanding onEnter={handleInitialLandingComplete} />
      
      {showContent && (
        <>
          <ParticleSystem count={80} />
          <div className="relative z-10 text-center pt-4 pb-2">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#FF9E2C] glow-text">
              The Casket Diaries
            </h1>
          </div>
          <Header />
          <MainNavigation 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
          />
          <MobileNavigation 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
          />
          
          <main className="relative z-10">
            <MeetingPointSection 
              activeSection={activeSection} 
              onVisible={handleSectionVisible} 
            />
            <CrucibleSection 
              activeSection={activeSection} 
              onVisible={handleSectionVisible} 
            />
            <SideBySideSection 
              activeSection={activeSection} 
              onVisible={handleSectionVisible} 
            />
            <EternalLightSection 
              activeSection={activeSection} 
              onVisible={handleSectionVisible} 
            />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
