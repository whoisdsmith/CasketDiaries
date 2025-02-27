import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Show header after initial landing
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start({ opacity: 1 });
    }, 1500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  if (!isVisible) return null;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={controls}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-[#1D1D1D] bg-opacity-80 backdrop-blur-sm py-3' : 'bg-opacity-0 py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo">
          <h1 className="font-serif text-lg md:text-xl tracking-wide">
            <span 
              className="text-[#FF9E2C]"
              style={{
                textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)'
              }}
            >
              The Casket Diaries
            </span>
          </h1>
        </div>
        <div className="hidden md:block">
          <button 
            className="bg-[#2D2D2D] hover:bg-[#232B38] text-[#F5F5F5] px-4 py-2 rounded-full border border-[#FF9E2C] border-opacity-30 transition-colors duration-300 text-sm"
            onClick={() => {
              document.getElementById('eternal-light')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
