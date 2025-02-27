import { useRef, useCallback, RefObject } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
  flickerRate: number;
  flickerDirection: number;
  flicker: number;
  rotationSpeed: number;
  rotation: number;
  baseSizeVariation: number;
  pulseSpeed: number;

  constructor(canvas: HTMLCanvasElement) {
    this.reset(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    // Randomly place particles throughout the canvas with more at bottom
    this.x = Math.random() * canvas.width;
    // More particles near the bottom
    const heightDistribution = Math.pow(Math.random(), 0.5); // Bias toward bottom
    this.y = canvas.height * (0.5 + heightDistribution * 0.5);
    
    // Size with more variation
    this.size = Math.random() * 4 + 1;
    
    // Slightly upward tendency for rising embers effect
    this.speedX = (Math.random() * 1 - 0.5) * 0.7;
    this.speedY = -(Math.random() * 1.5 + 0.2); // Negative to move upward
    
    // Create ember colors with more variation
    // Red-orange spectrum base
    const colorType = Math.random();
    let r, g, b, a;
    
    if (colorType < 0.7) {
      // Bright ember (orange-yellow)
      r = Math.floor(Math.random() * 55) + 200; // 200-255
      g = Math.floor(Math.random() * 100) + 80; // 80-180
      b = Math.floor(Math.random() * 40); // 0-40
      a = Math.random() * 0.5 + 0.5; // Brighter
    } else if (colorType < 0.9) {
      // Deep red ember
      r = Math.floor(Math.random() * 70) + 180; // 180-250
      g = Math.floor(Math.random() * 60) + 20; // 20-80
      b = Math.floor(Math.random() * 30); // 0-30
      a = Math.random() * 0.4 + 0.3; // Dimmer
    } else {
      // Dying ember (gray-red)
      r = Math.floor(Math.random() * 100) + 120; // 120-220
      g = Math.floor(Math.random() * 50) + 40; // 40-90
      b = Math.floor(Math.random() * 30) + 10; // 10-40
      a = Math.random() * 0.3 + 0.2; // Dimmest
    }
    
    this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.life = Math.random() * 200 + 100;
    this.maxLife = this.life;
    
    // Flickering effect properties
    this.flickerRate = Math.random() * 0.2 + 0.01;
    this.flickerDirection = 1;
    this.flicker = Math.random();
    
    // Rotation for non-circular particles
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.02 - 0.01);
    
    // Size variation for pulsing effect
    this.baseSizeVariation = Math.random() * 0.3 + 0.7;
    this.pulseSpeed = Math.random() * 0.05 + 0.02;
  }

  update(canvas: HTMLCanvasElement, mouseX: number, mouseY: number) {
    // Move the particle
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    
    // Gradual slowdown as ember rises and cools
    this.speedX *= 0.995;
    this.speedY *= 0.995;
    
    // Add slight random drift to mimic air currents
    this.speedX += (Math.random() - 0.5) * 0.02;
    this.speedY += (Math.random() - 0.5) * 0.01;
    
    // Update flickering effect
    this.flicker += this.flickerRate * this.flickerDirection;
    if (this.flicker >= 1 || this.flicker <= 0.4) {
      this.flickerDirection *= -1; // Reverse direction
    }
    
    // Update rotation
    this.rotation += this.rotationSpeed;
    
    // Magnetic effect towards mouse for interactivity
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const strength = 0.0008 * (1 - distance / 150); // Stronger when closer
      this.speedX += dx * strength;
      this.speedY += dy * strength;
    }

    // Respawn if off screen or life ended
    if (this.x < -100 || this.x > canvas.width + 100 || 
        this.y < -100 || this.y > canvas.height + 100 || 
        this.life <= 0) {
      this.reset(canvas);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Calculate opacity based on life and flicker
    const lifeRatio = this.life / this.maxLife;
    const flickerFactor = this.flicker * lifeRatio;
    const sizeVariation = this.baseSizeVariation + Math.sin(this.life * this.pulseSpeed) * 0.2;
    
    // Define glow size based on particle age
    const glowSize = Math.max(3, this.size * 2 * flickerFactor);
    
    // Set the color with varying opacity
    const parts = this.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (parts) {
      const [_, r, g, b, baseAlpha] = parts;
      const adjustedAlpha = parseFloat(baseAlpha) * flickerFactor;
      
      // Draw glow
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${adjustedAlpha * 0.5})`;
      
      // Save context for rotation
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Draw ember
      if (Math.random() > 0.7) {
        // Sometimes draw squares for variety
        const size = this.size * sizeVariation;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${adjustedAlpha})`;
        ctx.fillRect(-size/2, -size/2, size, size);
      } else {
        // Usually draw circles
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${adjustedAlpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * sizeVariation, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Restore context
      ctx.restore();
    }
  }
}

export const useParticleSystem = (
  canvasRef: RefObject<HTMLCanvasElement>,
  particleCount: number = 100,
  speed: number = 1
) => {
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    particles.current = [];
    const mobileCount = window.innerWidth < 768 ? particleCount / 2 : particleCount;
    
    for (let i = 0; i < mobileCount; i++) {
      particles.current.push(new Particle(canvas));
    }
  }, [particleCount, canvasRef]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.current.forEach((particle) => {
      particle.update(canvas, mousePosition.current.x, mousePosition.current.y);
      particle.draw(ctx);
    });

    // Continue animation loop
    animationFrameId.current = requestAnimationFrame(animate);
    return animationFrameId.current;
  }, [canvasRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;
  }, []);

  return {
    init,
    animate,
    handleMouseMove,
  };
};
