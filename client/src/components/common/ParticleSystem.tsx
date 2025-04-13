import { useRef, useEffect } from 'react';
import { useParticleSystem } from '@/hooks/useParticleSystem';

interface ParticleSystemProps {
  count?: number;
  speed?: number;
}

const ParticleSystem = ({
  count = 100,
  speed = 1
}: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { init, animate, handleMouseMove } = useParticleSystem(canvasRef, count, speed);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize the particle system
    init();
    
    // Start the animation loop
    let animationId = 0;
    
    try {
      animationId = animate() || 0;
    } catch (err) {
      console.error('Animation error:', err);
    }
    
    // Track mouse position
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      init(); // Reinitialize particles for new canvas size
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Only cancel if we have a valid animation ID
      if (animationId) {
        try {
          cancelAnimationFrame(animationId);
        } catch (err) {
          console.error('Error cancelling animation frame:', err);
        }
      }
    };
  }, [init, animate, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ 
        opacity: 0.8,
        touchAction: 'none'
      }}
    />
  );
};

export default ParticleSystem;
