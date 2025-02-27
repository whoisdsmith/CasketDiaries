import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChapterCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  themeColor?: string;
}

const ChapterCard = ({ 
  title, 
  isActive, 
  onClick, 
  themeColor = '#FF9E2C' 
}: ChapterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      className={`w-full text-left px-4 py-3 rounded-md transition-colors relative overflow-hidden ${
        isActive 
          ? 'bg-[#232B38]' 
          : 'hover:bg-[#2D2D2D]'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Glow Effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 opacity-20 blur-md"
          style={{ backgroundColor: themeColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {/* Left Border Indicator */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: themeColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="flex items-center justify-between">
        <span 
          className={`relative z-10 ${isActive ? 'font-medium' : ''}`}
          style={{ color: isActive ? themeColor : '#F5F5F5' }}
        >
          {title}
        </span>
        
        {/* Icon Indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm" style={{ color: themeColor }}>
              ✦
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Hover Effect */}
      {isHovered && !isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-opacity-50"
          style={{ backgroundColor: themeColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default ChapterCard;