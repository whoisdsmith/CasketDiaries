import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLandingProps {
  onEnter: () => void;
}

const InitialLanding = ({ onEnter }: InitialLandingProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const emberRef = useRef<HTMLDivElement>(null);

  const handleEmberClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  // Add subtle ember animation
  useEffect(() => {
    if (!emberRef.current) return;
    
    const ember = emberRef.current;
    let position = { x: 0, y: 0 };
    let animationFrame: number;
    
    const animate = () => {
      position.x += (Math.random() - 0.5) * 0.5;
      position.y += (Math.random() - 0.5) * 0.5;
      
      // Limit movement
      if (Math.abs(position.x) > 5) position.x *= 0.9;
      if (Math.abs(position.y) > 5) position.y *= 0.9;
      
      ember.style.transform = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex items-center justify-center h-screen w-screen bg-[#1A1E26] z-50"
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Silhouettes */}
            <div className="relative h-64 w-64 mb-8">
              <div className="absolute left-1/3 bottom-0 w-16 h-48 bg-[#1D1D1D] rounded-t-full"></div>
              <div className="absolute right-1/3 bottom-0 w-16 h-48 bg-[#1D1D1D] rounded-t-full"></div>
              
              {/* Single Ember */}
              <div 
                ref={emberRef}
                onClick={handleEmberClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 
                         bg-[#FF9E2C] rounded-full blur-sm animate-pulse cursor-pointer"
                style={{ 
                  boxShadow: '0 0 15px #FF9E2C, 0 0 25px rgba(255, 158, 44, 0.7)'
                }}
              ></div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="text-[#E8E8E8] mt-8"
            >
              Touch the ember to begin the journey
            </motion.p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default InitialLanding;
