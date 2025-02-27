import { ReactNode, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionLayoutProps {
  id: string;
  className?: string;
  title: string;
  titleColor?: string;
  children: ReactNode;
  weatherEffect?: 'rain' | 'fire' | 'fog' | 'stars';
  activeSection: string;
  onVisible: (id: string) => void;
}

const SectionLayout = ({
  id,
  className = "",
  title,
  titleColor = "text-[#F5F5F5]",
  children,
  weatherEffect,
  activeSection,
  onVisible
}: SectionLayoutProps) => {
  const controls = useAnimation();
  const titleControls = useAnimation();
  const contentControls = useAnimation();
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isActive = activeSection === id;

  // Animate when section comes into view
  useEffect(() => {
    if (inView) {
      onVisible(id);
      titleControls.start({ opacity: 1, y: 0 });
      contentControls.start({ opacity: 1, y: 0 });
    }
  }, [inView, id, onVisible, titleControls, contentControls]);

  // Weather effects rendering
  const renderWeatherEffect = () => {
    switch (weatherEffect) {
      case 'rain':
        return (
          <>
            <div 
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: `
                  linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%),
                  linear-gradient(to right, transparent 0%, transparent 45%, rgba(255,255,255,0.1) 45%, transparent 55%, transparent 100%)
                `,
                backgroundSize: '1px 5px, 10px 200px',
                animation: 'rain 1s linear infinite'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1E26] from-5% via-transparent via-50% to-transparent pointer-events-none opacity-30" />
          </>
        );
      case 'fire':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#232B38] to-[#1D1D1D] pointer-events-none">
            <div className="absolute left-0 bottom-0 w-full h-full opacity-10"
              style={{
                background: 'radial-gradient(ellipse at bottom, rgba(241, 90, 41, 0.3) 0%, transparent 70%)',
              }}
            />
          </div>
        );
      case 'fog':
        return (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#232B38] to-[#1A1E26] pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(26, 30, 38, 0.7) 0%, rgba(26, 30, 38, 0.3) 100%)',
              mixBlendMode: 'overlay'
            }}
          />
        );
      case 'stars':
        return (
          <div className="absolute inset-0 bg-[#1D1D1D] pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: Math.random() > 0.3 ? '#E8E8E8' : '#E6C200',
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `pulse ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite alternate`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen relative pt-20 overflow-hidden ${className}`}
    >
      {/* Weather effect layer */}
      {renderWeatherEffect()}
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleControls}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`font-serif text-4xl md:text-5xl text-center mb-12 ${titleColor}`}
            style={{
              textShadow: '0 0 10px rgba(255, 158, 44, 0.5), 0 0 20px rgba(255, 158, 44, 0.3)'
            }}
          >
            {title}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentControls}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="w-full max-w-4xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </div>
      
      {/* Section transition gradient */}
      <div className="h-24 w-full bg-gradient-to-b from-transparent to-[#1A1E26] absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default SectionLayout;
