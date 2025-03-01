import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '../landing/SectionLayout';

interface SideBySideSectionProps {
  activeSection: string;
  onVisible: (id: string) => void;
}

const SideBySideSection = ({ activeSection, onVisible }: SideBySideSectionProps) => {
  const isActive = activeSection === 'side-by-side';
  const leftFogRef = useRef<HTMLDivElement>(null);
  const rightFogRef = useRef<HTMLDivElement>(null);
  
  // Enhanced fog effect when the section is active
  useEffect(() => {
    if (isActive && leftFogRef.current && rightFogRef.current) {
      leftFogRef.current.style.animation = 'fogMove 20s infinite alternate';
      rightFogRef.current.style.animation = 'fogMove 20s infinite alternate-reverse';
    }
  }, [isActive]);

  return (
    <SectionLayout
      id="side-by-side"
      title="Side By Side, Hand In Hand"
      activeSection={activeSection}
      onVisible={onVisible}
      weatherEffect="fog"
    >
      {/* Split Screen Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-1 mb-16 relative">
        {/* Left Side */}
        <div className="bg-[#1A1E26] p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none relative overflow-hidden" id="left-side">
          <div ref={leftFogRef} className="absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-serif text-xl mb-4 text-[#FF9E2C]">His Perspective</h3>
            <p className="text-[#E8E8E8] mb-6">
              "To me, nothing outshines you," Greg writes. For a man who spent years believing he belonged in the darkness, Sadie became his reason to stay in the light. He views their bond as the miracle neither expected—a safe haven where his most vulnerable self is embraced, never judged.
            </p>
            <div className="h-40 relative mb-6">
              <div className="absolute right-0 bottom-0 w-24 h-24 opacity-70">
                <div className="w-full h-full bg-[#232B38] rounded-full border border-[#E8E8E8] border-opacity-10 flex items-center justify-center overflow-hidden">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#F5F5F5" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </motion.svg>
                </div>
              </div>
            </div>
            <blockquote className="italic text-[#FF9E2C] text-right">
              "Every day by your side is a gift I never deserved but will forever cherish."
            </blockquote>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="bg-[#232B38] p-6 rounded-b-lg md:rounded-r-lg md:rounded-bl-none relative overflow-hidden" id="right-side">
          <div ref={rightFogRef} className="absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-serif text-xl mb-4 text-[#FF9E2C]">Her Perspective</h3>
            <p className="text-[#E8E8E8] mb-6">
              Where others saw brokenness in Greg, Sadie recognized strength. She found in him something rare—a love without conditions, a promise kept through even the darkest nights. Their relationship proved to her that two imperfect souls could create something beautifully whole.
            </p>
            <div className="h-40 relative mb-6">
              <div className="absolute left-0 bottom-0 w-24 h-24 opacity-70">
                <div className="w-full h-full bg-[#1A1E26] rounded-full border border-[#E8E8E8] border-opacity-10 flex items-center justify-center overflow-hidden">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#F5F5F5" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </motion.svg>
                </div>
              </div>
            </div>
            <blockquote className="italic text-[#FF9E2C]">
              "In a world full of temporary, you are my always."
            </blockquote>
          </div>
        </div>
        
        {/* Animated Hands in the middle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative">
            <div className="w-10 h-px bg-[#FF9E2C] opacity-70"></div>
            <motion.div 
              className="w-4 h-4 bg-[#FF9E2C] rounded-full absolute -left-2 -top-2 blur-sm"
              style={{
                boxShadow: '0 0 10px rgba(255, 158, 44, 0.8), 0 0 20px rgba(255, 158, 44, 0.4)'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#2D2D2D] bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#F5F5F5] border-opacity-10 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-serif text-xl mb-4 text-[#F5F5F5]">United Journey</h3>
            <p className="text-[#E8E8E8] leading-relaxed">
              Their love story wasn't one of perfect synchronicity from the start. It was built through conflicts resolved together, through understanding gained and patience practiced. They learned that love doesn't mean erasing differences, but embracing them—creating a stronger bond through complement rather than sameness.
            </p>
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-xl mb-4 text-[#F5F5F5]">Enduring Promise</h3>
            <p className="text-[#E8E8E8] leading-relaxed">
              Never again would they face their demons alone. This simple promise—to walk together through every triumph and trial—transformed their individual paths into a shared journey. Their midnight conversations and morning rituals became touchstones in a world that often felt designed to pull them apart.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <blockquote 
          className="italic text-[#FF9E2C] text-lg md:text-xl mb-4"
          style={{ textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)' }}
        >
          "Together we defy the odds, unbreakable in our resolve, unwavering in our loyalty."
        </blockquote>
        <p className="text-[#E8E8E8] text-sm mb-6">— From their shared journal, 2018</p>
        
        <blockquote 
          className="italic text-[#FF9E2C] text-lg md:text-xl mb-2"
          style={{ textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)' }}
        >
          "Whatever Hell lies ahead, I'll be there fighting every demon with you. Side by side, hand in hand, there are no battles we can't get through."
        </blockquote>
      </div>
    </SectionLayout>
  );
};

export default SideBySideSection;
