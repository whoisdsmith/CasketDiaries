import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useLocation } from 'wouter';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [location, setLocation] = useLocation();

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

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
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
          <Link href="/">
            <h1 className="font-serif text-lg md:text-xl tracking-wide cursor-pointer">
              <span 
                className="text-[#FF9E2C]"
                style={{
                  textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)'
                }}
              >
                The Casket Diaries
              </span>
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 mr-4">
            <Link href="/about">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/greg-reeves">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 cursor-pointer">
                Greg Reeves
              </span>
            </Link>
            <Link href="/sadie-gray">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 cursor-pointer">
                Sadie Gray
              </span>
            </Link>
          </nav>
          <button 
            className="bg-[#2D2D2D] hover:bg-[#232B38] text-[#F5F5F5] px-4 py-2 rounded-full border border-[#FF9E2C] border-opacity-30 transition-colors duration-300 text-sm"
            onClick={() => {
              document.getElementById('eternal-light')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col space-y-1.5 p-1.5 relative z-50"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#FF9E2C] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#FF9E2C] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-[#FF9E2C] transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="absolute top-0 left-0 w-full h-screen bg-[#1A1A1A] bg-opacity-95 backdrop-blur-md z-30 py-20 px-6"
        >
          <div className="flex flex-col items-center space-y-6 pt-10">
            <Link href="/about">
              <span 
                className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 text-xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </span>
            </Link>
            <Link href="/greg-reeves">
              <span 
                className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 text-xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Greg Reeves
              </span>
            </Link>
            <Link href="/sadie-gray">
              <span 
                className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors duration-300 text-xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sadie Gray
              </span>
            </Link>
            <button 
              className="mt-8 bg-[#2D2D2D] hover:bg-[#232B38] text-[#F5F5F5] px-6 py-3 rounded-full border border-[#FF9E2C] border-opacity-30 transition-colors duration-300"
              onClick={() => {
                document.getElementById('eternal-light')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
