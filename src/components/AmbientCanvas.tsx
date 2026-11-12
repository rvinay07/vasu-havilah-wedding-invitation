import React, { useEffect, useRef } from 'react';

export const AmbientCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    const lightColors = [
      'rgba(201, 130, 113, ', // Dusty Rose
      'rgba(103, 114, 74, ',  // Olive Green
      'rgba(194, 204, 168, ', // Soft Pear Green
      'rgba(255, 237, 220, ', // Cream White
    ];

    const darkColors = [
      'rgba(214, 184, 120, ', // Champagne Gold (#D6B878)
      'rgba(241, 235, 221, ', // Primary Ivory (#F1EBDD)
      'rgba(166, 179, 161, ', // Sage Accent (#A6B3A1)
      'rgba(230, 204, 145, ', // Gold Hover (#E6CC91)
    ];

    const particleCount = Math.min(36, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.45 + 0.2,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      colorIndex: Math.floor(Math.random() * 4),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const activeColors = isDark() ? darkColors : lightColors;

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${activeColors[p.colorIndex]}${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-[1] ${className}`}
      aria-hidden="true"
    />
  );
};
