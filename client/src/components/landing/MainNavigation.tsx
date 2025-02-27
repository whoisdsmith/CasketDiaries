import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MainNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MainNavigation = ({ activeSection, onNavigate }: MainNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Show navigation after initial landing
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start({ opacity: 1 });
    }, 1500);

    return () => clearTimeout(timer);
  }, [controls]);

  if (!isVisible) return null;

  const sections = [
    { id: 'meeting-point', label: 'The Meeting Point' },
    { id: 'crucible', label: 'The Crucible' },
    { id: 'side-by-side', label: 'Side By Side' },
    { id: 'eternal-light', label: 'Eternal Light' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={controls}
      className="hidden md:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40"
    >
      <div className="flex flex-col items-center">
        {sections.map((section, index) => (
          <div key={section.id} className="relative mb-8">
            <button
              className={`w-3 h-3 rounded-full transition-all duration-300 relative z-10 ${
                activeSection === section.id 
                  ? 'bg-[#FF9E2C] shadow-[0_0_10px_#FF9E2C,0_0_20px_rgba(255,158,44,0.5)]' 
                  : 'bg-[#E8E8E8] bg-opacity-20 hover:scale-125'
              }`}
              onClick={() => onNavigate(section.id)}
              aria-label={section.label}
            />
            
            {/* Line connecting the dots (except for the last one) */}
            {index < sections.length - 1 && (
              <div 
                className={`absolute top-3 left-1/2 w-px h-8 transform -translate-x-1/2 ${
                  activeSection === section.id 
                    ? 'bg-gradient-to-b from-[#FF9E2C] to-transparent' 
                    : 'bg-[#E8E8E8] bg-opacity-10'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

export default MainNavigation;
