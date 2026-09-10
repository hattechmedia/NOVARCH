'use client';

import * as React from 'react';

export function ConstellationBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate constellation particles (clean, crisp, subtle)
    const particleCount = 42;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isRight = Math.random() > 0.35;
      const x = isRight
        ? width * 0.45 + Math.random() * (width * 0.55)
        : Math.random() * (width * 0.45);
      const y = Math.random() * height;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.4 + 0.2,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    let t = 0;

    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(t + i) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw subtle connection lines
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#030712]">
      {/* Deep cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#040817] to-[#030712]" />

      {/* Subtle, soft ambient radial glow behind orbit section (NOT overblown) */}
      <div
        className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none opacity-15 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* Subtle bottom-left energy sweep */}
      <svg
        className="absolute bottom-0 left-0 w-[450px] h-[260px] pointer-events-none opacity-15"
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 300C50 220 180 180 320 220C420 250 480 300 500 300"
          stroke="url(#blue-sweep-grad)"
          strokeWidth="1.2"
        />
        <path
          d="M-80 300C80 200 240 160 400 240C460 270 490 300 500 300"
          stroke="url(#blue-sweep-grad)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />
        <defs>
          <linearGradient id="blue-sweep-grad" x1="0" y1="200" x2="500" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="1" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
