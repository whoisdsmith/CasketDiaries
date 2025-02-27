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

  constructor(canvas: HTMLCanvasElement) {
    this.reset(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    
    // Create amber/orange/gold colors
    const r = Math.floor(Math.random() * 50) + 200; // 200-250 (red)
    const g = Math.floor(Math.random() * 100) + 85; // 85-185 (green)
    const b = Math.floor(Math.random() * 30) + 10; // 10-40 (blue)
    const a = Math.random() * 0.5 + 0.3; // 0.3-0.8 (alpha)
    
    this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.life = Math.random() * 100 + 100;
    this.maxLife = this.life;
  }

  update(canvas: HTMLCanvasElement, mouseX: number, mouseY: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;

    // Magnetic effect towards mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      this.speedX += dx * 0.0005;
      this.speedY += dy * 0.0005;
    }

    // Respawn if off screen or life ended
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life <= 0) {
      this.reset(canvas);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const opacity = this.life / this.maxLife;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
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
