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
              <img 
                src="/attached_assets/images/20250210_224743375_iOS 1.jpg" 
                alt="Greg and Sadie" 
                className="w-full h-full object-cover object-center opacity-80"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-[#1D1D1D50] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <p className="text-[#F5F5F5] italic font-medium text-lg"
                 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
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
