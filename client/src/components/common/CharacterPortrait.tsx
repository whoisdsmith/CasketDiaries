import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';

interface CharacterPortraitProps {
  name: string;
  imageSrc?: string;
  fallbackEmoji: string;
  themeColor: string;
  glowEffect?: boolean;
}

const CharacterPortrait = ({ 
  name, 
  imageSrc, 
  fallbackEmoji, 
  themeColor, 
  glowEffect = true 
}: CharacterPortraitProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const glowControls = useAnimation();
  const portraitRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.3 }
      });
      
      if (glowEffect) {
        glowControls.start({
          opacity: 0.7,
          scale: 1.15,
          transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
        });
      }
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.3 }
      });
      
      if (glowEffect) {
        glowControls.start({
          opacity: 0.2,
          scale: 1,
          transition: { duration: 0.5 }
        });
      }
    }
  }, [isHovered, controls, glowControls, glowEffect]);

  // Random subtle movement for more interactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        controls.start({
          y: Math.random() < 0.5 ? -3 : 3,
          x: Math.random() < 0.5 ? -2 : 2,
          transition: { duration: 2, ease: "easeInOut" }
        }).then(() => {
          controls.start({
            y: 0,
            x: 0,
            transition: { duration: 2, ease: "easeInOut" }
          });
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, isHovered]);

  // Mouse move parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current || isHovered) return;
    
    const rect = portraitRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / 20;
    const moveY = (e.clientY - centerY) / 20;
    
    controls.start({
      x: moveX,
      y: moveY,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  };

  return (
    <div 
      className="relative aspect-square w-full max-w-[300px] mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={portraitRef}
    >
      {/* Glow effect background */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-20 z-0"
          style={{ backgroundColor: themeColor }}
          animate={glowControls}
        />
      )}
      
      {/* Character portrait */}
      <motion.div
        className="relative z-10 w-full h-full rounded-xl overflow-hidden cursor-pointer bg-[#242936] border-2"
        style={{ borderColor: themeColor }}
        animate={controls}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageSrc ? (
          <div className="w-full h-full">
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">
            {fallbackEmoji}
          </div>
        )}
        
        {/* Character name overlay that appears on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 
            className="text-2xl font-serif drop-shadow-lg"
            style={{ color: themeColor }}
          >
            {name}
          </h3>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full z-0"
        style={{ backgroundColor: themeColor }}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.6, 0.8, 0.6] : 0.6,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default CharacterPortrait;