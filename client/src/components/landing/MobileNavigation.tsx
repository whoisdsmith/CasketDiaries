import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MobileNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNavigation = ({ activeSection, onNavigate }: MobileNavigationProps) => {
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
    { id: 'meeting-point', label: 'Meeting' },
    { id: 'crucible', label: 'Crucible' },
    { id: 'side-by-side', label: 'Side by Side' },
    { id: 'eternal-light', label: 'Eternal' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D1D1D] bg-opacity-80 backdrop-blur-sm z-40 p-3 border-t border-[#FF9E2C] border-opacity-30"
    >
      <div className="flex justify-around">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="flex flex-col items-center"
          >
            <div 
              className={`h-2 w-2 rounded-full mb-1 ${
                activeSection === section.id 
                  ? 'bg-[#FF9E2C]' 
                  : 'bg-[#E8E8E8] bg-opacity-30'
              }`}
            />
            <span 
              className={`text-xs ${
                activeSection === section.id 
                  ? 'text-[#FF9E2C]' 
                  : 'text-[#E8E8E8]'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
