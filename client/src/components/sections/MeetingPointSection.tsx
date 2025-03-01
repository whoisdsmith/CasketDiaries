import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SectionLayout from '../landing/SectionLayout';

interface MeetingPointSectionProps {
  activeSection: string;
  onVisible: (id: string) => void;
}

const MeetingPointSection = ({ activeSection, onVisible }: MeetingPointSectionProps) => {
  const isActive = activeSection === 'meeting-point';
  const lightSource1Ref = useRef<HTMLDivElement>(null);
  const lightSource2Ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isActive && lightSource1Ref.current && lightSource2Ref.current) {
      // Animate light sources when section becomes active
      const light1 = lightSource1Ref.current;
      const light2 = lightSource2Ref.current;
      
      light1.style.opacity = '0';
      light2.style.opacity = '0';
      
      setTimeout(() => {
        light1.style.opacity = '0.7';
        light1.style.transition = 'all 2s ease';
        light1.style.transform = 'translateY(80px) translateX(40px)';
      }, 500);
      
      setTimeout(() => {
        light2.style.opacity = '0.7';
        light2.style.transition = 'all 2s ease';
        light2.style.transform = 'translateY(80px) translateX(-40px)';
      }, 1000);
    }
  }, [isActive]);

  return (
    <SectionLayout
      id="meeting-point"
      title="First Encounter"
      activeSection={activeSection}
      onVisible={onVisible}
      weatherEffect="rain"
    >
      {/* Two Light Sources Animation */}
      <div className="relative h-40 w-full max-w-lg mb-16 mx-auto">
        <div 
          ref={lightSource1Ref}
          className="absolute left-1/4 top-0 w-8 h-8 bg-[#FF9E2C] rounded-full blur-md opacity-0"
          style={{ 
            boxShadow: '0 0 20px rgba(255, 158, 44, 0.8), 0 0 40px rgba(255, 158, 44, 0.4)'
          }}
        />
        <div 
          ref={lightSource2Ref}
          className="absolute right-1/4 top-0 w-8 h-8 bg-[#FF9E2C] rounded-full blur-md opacity-0"
          style={{ 
            boxShadow: '0 0 20px rgba(255, 158, 44, 0.8), 0 0 40px rgba(255, 158, 44, 0.4)'
          }}
        />
      </div>
      
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative mb-12 text-center">
          <p 
            className="text-lg md:text-xl italic text-[#E8E8E8] overflow-hidden whitespace-nowrap mx-auto"
            style={{
              animation: isActive ? 'typing 3.5s steps(40, end) 1s forwards' : 'none',
              width: '0',
              borderRight: '2px solid #E6C200'
            }}
          >
            Where Two Broken Paths Converged
          </p>
        </div>
        
        <div className="bg-[#2D2D2D] bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#F5F5F5] border-opacity-10 mb-8">
          <p className="text-[#E8E8E8] mb-4 leading-relaxed">
            In the quiet of a Barnes & Noble parking lot, beneath the November chill of 2011, two souls collided. Greg, haunted by the absence of his son Edward and battling demons of depression, met Sadie—a young mother carrying the weight of her fractured childhood beneath a gray Yellowcard shirt and a cautious smile.
          </p>
          <p className="text-[#E8E8E8] mb-4 leading-relaxed">
            Their connection—immediate and electric—blossomed from Facebook messages into a love that would redefine them both. What began as a shared passion for music transformed into a refuge where two wounded hearts found unexpected healing.
          </p>
        </div>
        
        <div className="mb-8 relative">
          <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 bg-[#1D1D1D] flex items-center justify-center">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#F5F5F5" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <path d="M17.3 5c.2.7.3 1.4.3 2.1v.1"></path>
                <path d="M17 7.2v.01"></path>
                <path d="M12 19c1.9 0 3.6-1.2 4.2-3"></path>
                <path d="M12 19c-3.3 0-6-2.7-6-6 0-2 .5-3.4 1.5-5.4C9.5 4.8 12 3 13 2c2 3 5 4 7 6-2.7-1.4-5.7.9-5.5 3.2.1 1.2.7 1.8 1.5 2.3"></path>
                <path d="M17.5 8C19 9.5 20 11.2 20 13c0 2-1.3 4-2 5-1.3-2.5-1-3.5-1-3.5 1-2-1-3-1-3 1-2-.5-3-.5-3 1-2-1-3-1-3 1-2-2-2.5-2-2.5C13 8 12 5 12 5c-.5.8-1.8 2.4-3 3"></path>
                <path d="M11 13c-.3-1.4.2-2.9 1.2-3.8"></path>
              </motion.svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <p className="text-[#F5F5F5] italic"
                 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                "In darkness, we found each other's light."
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <blockquote 
            className="italic text-[#FF9E2C] text-lg md:text-xl mb-2"
            style={{ textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)' }}
          >
            "I'll never forget the smile she gave me when we got out of cars to finally meet. I'll never forget the way my stomach was tied in knots and how my heart was racing like an Olympian. I'll never forget the way I felt that night, cause I still feel the same way this very day."
          </blockquote>
          <p className="text-[#E8E8E8] mt-6 text-lg">
            "I've been in love with you since the day I saw you walk up to my car back in 2011. I've never pictured a future that didn't have you in it."
          </p>
        </div>
      </div>
    </SectionLayout>
  );
};

export default MeetingPointSection;
