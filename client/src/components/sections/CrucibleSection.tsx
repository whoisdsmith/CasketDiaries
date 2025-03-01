import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '../landing/SectionLayout';

interface CrucibleSectionProps {
  activeSection: string;
  onVisible: (id: string) => void;
}

const CrucibleSection = ({ activeSection, onVisible }: CrucibleSectionProps) => {
  const isActive = activeSection === 'crucible';
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the crucible section
  useEffect(() => {
    if (!isActive || !parallaxRef.current) return;
    
    const parallaxItems = parallaxRef.current.querySelectorAll('[data-depth]');
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      parallaxItems.forEach(item => {
        const depth = parseFloat(item.getAttribute('data-depth') || '0');
        const moveX = (x - 0.5) * depth * 100;
        const moveY = (y - 0.5) * depth * 100;
        
        (item as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <SectionLayout
      id="crucible"
      title="A Love That Burns Forever"
      titleColor="text-[#F15A29]"
      activeSection={activeSection}
      onVisible={onVisible}
      weatherEffect="fire"
    >
      {/* Parallax Elements */}
      <div 
        ref={parallaxRef}
        className="relative h-80 mb-12 overflow-hidden rounded-lg"
      >
        <div data-depth="0.2" className="absolute inset-0 bg-[#1A1E26]"></div>
        <div data-depth="0.4" className="absolute left-1/4 top-1/3 w-32 h-32 bg-[#F15A29] rounded-full blur-xl opacity-30"></div>
        <div data-depth="0.5" className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-[#E6C200] rounded-full blur-xl opacity-20"></div>
        <div data-depth="0.7" className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-xs text-center">
            <p className="text-[#F5F5F5] text-2xl font-serif">Forged in Flames</p>
            <p className="text-[#E8E8E8] text-sm mt-2">Where love endures through life's fiercest trials</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#2D2D2D] bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#F15A29] border-opacity-20 mb-12">
        <p className="text-[#E8E8E8] mb-4 leading-relaxed">
          Love isn't perfection—it's persistence. Through addiction, self-destruction, abandonment and mental illness, Greg and Sadie refused to let their flame extinguish. The challenges that might have broken other relationships only deepened their commitment to each other.
        </p>
        <p className="text-[#E8E8E8] mb-4 leading-relaxed">
          For twelve years they've weathered each storm together: her childhood trauma and his ongoing depression, the loss of his son and her fear of inadequacy. Every setback became another thread binding them closer, proving that even amid darkness, their love continues to provide light.
        </p>
        <p className="text-[#E8E8E8] leading-relaxed">
          This section, named for their most poignant love letter, captures the essence of their bond—how they continue to choose each other every day, despite knowing every imperfection, every wound, every scar.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1A1E26] rounded-lg overflow-hidden shadow-lg relative">
          <div className="w-full h-48 bg-[#232B38] relative overflow-hidden">
            <motion.div 
              className="absolute inset-0" 
              animate={{ 
                background: [
                  'radial-gradient(circle at 30% 70%, #F15A29 0%, transparent 50%)',
                  'radial-gradient(circle at 70% 30%, #F15A29 0%, transparent 50%)',
                  'radial-gradient(circle at 30% 30%, #F15A29 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-30 blur-md"
              animate={{ 
                boxShadow: [
                  '0 0 40px 20px rgba(241, 90, 41, 0.6)',
                  '0 0 20px 10px rgba(241, 90, 41, 0.6)',
                  '0 0 40px 20px rgba(241, 90, 41, 0.6)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="p-4">
            <blockquote className="text-[#F15A29] italic mb-2">
              "You are the air in my lungs, the blood in my veins. I'd rather die than spend another second without you."
            </blockquote>
            <p className="text-[#E8E8E8] text-sm">— Greg to Sadie, 2015</p>
          </div>
        </div>
        <div className="bg-[#1A1E26] rounded-lg overflow-hidden shadow-lg relative">
          <div className="w-full h-48 bg-[#232B38] flex justify-center items-center relative">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#F15A29] to-transparent" />
            <div className="relative z-10 flex">
              <motion.div 
                className="w-16 h-40 bg-[#1D1D1D] rounded-t-full mr-2"
                animate={{ x: -5 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="w-16 h-40 bg-[#1D1D1D] rounded-t-full ml-2"
                animate={{ x: 5 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
          <div className="p-4">
            <blockquote className="text-[#F15A29] italic mb-2">
              "When I close my eyes, I still see you surrounded by burning embers, your hand extended toward mine."
            </blockquote>
            <p className="text-[#E8E8E8] text-sm">— Sadie to Greg, 2020</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-[#E8E8E8] italic text-lg mb-2">"For a love that burns forever, no trial is too great, no darkness too deep."</p>
        <blockquote className="italic text-[#F15A29] text-lg md:text-xl mb-2" style={{ textShadow: '0 0 5px rgba(241, 90, 41, 0.7), 0 0 10px rgba(241, 90, 41, 0.5)' }}>
          "Hell might feel like home to others, but it's no place for us. So if someday you feel that's where you belong, I would burn up everyday, just to be with you."
        </blockquote>
      </div>
    </SectionLayout>
  );
};

export default CrucibleSection;
