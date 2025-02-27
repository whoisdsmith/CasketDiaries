import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SectionLayout from '../landing/SectionLayout';
import CountdownTimer from '../common/CountdownTimer';
import NewsletterForm from '../common/NewsletterForm';

interface EternalLightSectionProps {
  activeSection: string;
  onVisible: (id: string) => void;
}

const EternalLightSection = ({ activeSection, onVisible }: EternalLightSectionProps) => {
  const isActive = activeSection === 'eternal-light';
  const flame1Ref = useRef<HTMLDivElement>(null);
  const flame2Ref = useRef<HTMLDivElement>(null);
  const flameParentRef = useRef<HTMLDivElement>(null);

  // Flames joining animation
  useEffect(() => {
    if (isActive && flame1Ref.current && flame2Ref.current && flameParentRef.current) {
      const flame1 = flame1Ref.current;
      const flame2 = flame2Ref.current;
      const parent = flameParentRef.current;
      
      setTimeout(() => {
        flame1.style.transition = 'all 3s ease';
        flame2.style.transition = 'all 3s ease';
        flame1.style.transform = 'translateX(16px)';
        flame2.style.transform = 'translateX(-16px)';
      }, 1000);
      
      setTimeout(() => {
        flame1.style.width = '12px';
        flame1.style.height = '12px';
        flame2.style.width = '12px';
        flame2.style.height = '12px';
        
        // Create flame burst effect
        const flameBurst = document.createElement('div');
        flameBurst.className = 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#FF9E2C] rounded-full blur-md';
        flameBurst.style.boxShadow = '0 0 30px rgba(255, 158, 44, 0.8), 0 0 60px rgba(255, 158, 44, 0.5)';
        flameBurst.style.animation = 'fadeIn 0.5s forwards, fadeOut 2s 0.5s forwards';
        flameBurst.style.opacity = '0';
        parent.appendChild(flameBurst);
      }, 4000);
    }
  }, [isActive]);

  return (
    <SectionLayout
      id="eternal-light"
      title="Eternal Light"
      titleColor="text-[#E6C200]"
      activeSection={activeSection}
      onVisible={onVisible}
      weatherEffect="stars"
    >
      {/* Two Flames Joining Animation */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-[#1D1D1D]">
          {/* Star field generated in the SectionLayout component */}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={flameParentRef} className="relative h-20 w-40">
            <div 
              ref={flame1Ref}
              className="absolute left-0 bottom-0 w-8 h-8 bg-[#FF9E2C] rounded-full blur-md"
              style={{ 
                boxShadow: '0 0 15px rgba(255, 158, 44, 0.8), 0 0 30px rgba(255, 158, 44, 0.5)'
              }}
            />
            <div 
              ref={flame2Ref}
              className="absolute right-0 bottom-0 w-8 h-8 bg-[#F15A29] rounded-full blur-md"
              style={{ 
                boxShadow: '0 0 15px rgba(241, 90, 41, 0.8), 0 0 30px rgba(241, 90, 41, 0.5)'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#2D2D2D] bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#E6C200] border-opacity-20 mb-12">
        <p className="text-[#E8E8E8] mb-4 leading-relaxed">
          Through years of love and loss, separation and reunion, Greg and Sadie discovered that some connections transcend time and circumstance. Their story—like the embers that float through cemetery weather—proves that even in the darkest places, light finds a way to persist.
        </p>
        <blockquote className="italic text-[#E6C200] text-lg my-4" style={{ textShadow: '0 0 5px rgba(230, 194, 0, 0.7), 0 0 10px rgba(230, 194, 0, 0.5)' }}>
          "For even in the darkness, a single spark can ignite, a love that burns forever, a beacon in the night"
        </blockquote>
        <p className="text-[#E8E8E8] leading-relaxed">
          The Casket Diaries is their testament: a love that burns eternal, a flame that weather cannot extinguish.
        </p>
        <blockquote className="italic text-[#E6C200] text-lg mt-4" style={{ textShadow: '0 0 5px rgba(230, 194, 0, 0.7), 0 0 10px rgba(230, 194, 0, 0.5)' }}>
          "Hell might feel like home to others, but it's no place for us. So if someday you feel that's where you belong, I would burn up everyday, just to be with you."
        </blockquote>
      </div>
      
      {/* Countdown Timer */}
      <div className="text-center mb-12">
        <h3 className="font-serif text-2xl mb-6 text-[#F5F5F5]">Full Release Coming Soon</h3>
        
        <CountdownTimer />
        
        <p className="text-[#E8E8E8] italic mb-6">Be the first to experience the complete story and soundtrack</p>
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-[#1A1E26] rounded-lg p-6 md:p-8 border border-[#FF9E2C] border-opacity-20">
        <h3 className="font-serif text-xl mb-4 text-[#F5F5F5] text-center">Join Our Journey</h3>
        
        <div className="mb-6">
          <blockquote className="italic text-center text-[#FF9E2C] text-lg mb-4" style={{ textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)' }}>
            "Out of all the things you love, you always leave yourself off that list. Stop wasting your life in places where people don't see you exist."
          </blockquote>
        </div>
        
        <NewsletterForm />
        
        <p className="text-[#E8E8E8] text-sm mt-4 text-center">
          Be notified when the full experience launches
        </p>
      </div>
    </SectionLayout>
  );
};

export default EternalLightSection;
