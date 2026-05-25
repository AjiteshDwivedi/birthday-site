import { useEffect, useRef } from 'react';

export default function FallingStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star properties
    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      decay: number;
      speed: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    // Create background starfield
    const initStars = () => {
      stars.length = 0;
      const count = Math.min(Math.floor((width * height) / 4000), 200);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          decay: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          speed: Math.random() * 0.05 + 0.02,
        });
      }
    };

    initStars();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Simple deep celestial gradient backplane
      const radialGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      radialGradient.addColorStop(0, '#0a0a23'); // Space blue core
      radialGradient.addColorStop(0.5, '#04020a'); // Ultra deep indigo
      radialGradient.addColorStop(1, '#020005'); // Cosmic black
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.decay;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.decay = -star.decay;
        }

        // Clip alpha range
        star.alpha = Math.max(0.1, Math.min(star.alpha, 1));
        
        ctx.fillStyle = `rgba(224, 204, 255, ${star.alpha})`; // Purple star tint
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Slow drifting
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      // Spawn Shooting Stars
      if (Math.random() < 0.0008 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 6 + Math.random() * 0.1, // around 30 degrees descent
          opacity: 1,
          active: true,
        });
      }

      // Draw Shooting Stars
      shootingStars.forEach((sStar, index) => {
        if (!sStar.active) return;

        sStar.x += sStar.speed;
        sStar.y += sStar.speed * Math.tan(sStar.angle);
        sStar.opacity -= 0.015;

        if (sStar.opacity <= 0 || sStar.x > width || sStar.y > height) {
          sStar.active = false;
          shootingStars.splice(index, 1);
          return;
        }

        const endX = sStar.x - sStar.length * Math.cos(sStar.angle);
        const endY = sStar.y - sStar.length * Math.sin(sStar.angle);

        const gradient = ctx.createLinearGradient(sStar.x, sStar.y, endX, endY);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${sStar.opacity})`); // Vibrant purple
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${sStar.opacity * 0.5})`); // Indigo spacer
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sStar.x, sStar.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Add small star head blast glow
        ctx.fillStyle = `rgba(255, 255, 255, ${sStar.opacity})`;
        ctx.beginPath();
        ctx.arc(sStar.x, sStar.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="space-starfield"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
