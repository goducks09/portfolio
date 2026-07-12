import React, { useRef, useCallback, useEffect } from 'react';

const lerp = (a, b, t) => a + (b - a) * t;

export default function InteractiveCard() {
  const pc3GlowRef = useRef(null);
  const pc3NumRef = useRef(null);
  const pc3CardRef = useRef(null);
  const pc3Raf = useRef(null);
  const pc3MousePos = useRef({ mx: 0, my: 0 });
  const pc3GlowPos = useRef({ gx: 0, gy: 0 });

  const tickPc3 = useCallback(() => {
    pc3GlowPos.current.gx = lerp(pc3GlowPos.current.gx, pc3MousePos.current.mx, 0.1);
    pc3GlowPos.current.gy = lerp(pc3GlowPos.current.gy, pc3MousePos.current.my, 0.1);
    if (pc3GlowRef.current) {
      pc3GlowRef.current.style.left = `${pc3GlowPos.current.gx}px`;
      pc3GlowRef.current.style.top = `${pc3GlowPos.current.gy}px`;
    }
    pc3Raf.current = requestAnimationFrame(tickPc3);
  }, []);

  const handlePc3MouseEnter = useCallback((e) => {
    if (!pc3CardRef.current) return;
    const r = pc3CardRef.current.getBoundingClientRect();
    const startX = r.width / 2;
    const startY = r.height / 2;
    pc3GlowPos.current = { gx: startX, gy: startY };
    pc3MousePos.current = { mx: startX, my: startY };
    if (pc3GlowRef.current) {
      pc3GlowRef.current.style.left = `${startX}px`;
      pc3GlowRef.current.style.top = `${startY}px`;
      pc3GlowRef.current.style.opacity = '1';
    }
    pc3Raf.current = requestAnimationFrame(tickPc3);
  }, [tickPc3]);

  const handlePc3MouseMove = useCallback((e) => {
    if (!pc3CardRef.current) return;
    const r = pc3CardRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    pc3MousePos.current = { mx, my };

    // Parallax: num moves at ~12% of cursor offset from center
    const dx = (mx - r.width / 2) * 0.12;
    const dy = (my - r.height / 2) * 0.12;
    if (pc3NumRef.current) {
      pc3NumRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  }, []);

  const handlePc3MouseLeave = useCallback(() => {
    if (pc3Raf.current) cancelAnimationFrame(pc3Raf.current);
    if (pc3GlowRef.current) {
      pc3GlowRef.current.style.opacity = '0';
    }
    if (pc3NumRef.current) {
      pc3NumRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      pc3NumRef.current.style.transform = 'translate(0px, 0px)';
      setTimeout(() => {
        if (pc3NumRef.current) {
          pc3NumRef.current.style.transition = 'transform 0.12s linear';
        }
      }, 620);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pc3Raf.current) cancelAnimationFrame(pc3Raf.current);
    };
  }, []);

  return (
    <div
      className="principle-card"
      id="pc3"
      role="presentation"
      ref={pc3CardRef}
      onMouseEnter={handlePc3MouseEnter}
      onMouseMove={handlePc3MouseMove}
      onMouseLeave={handlePc3MouseLeave}
    >
      <div
        className="pc3-glow"
        aria-hidden="true"
        ref={pc3GlowRef}
        style={{
          left: '50%',
          top: '50%',
          opacity: 0
        }}
      />
      <div
        className="principle-num pc3-num"
        ref={pc3NumRef}
        style={{
          transform: 'translate(0px, 0px)',
          transition: 'transform 0.12s linear'
        }}
      >
        03
      </div>
      <p>Create dynamic sites that keep users engaged.</p>
      <div className="pc3-reveal" aria-hidden="true">Interactivity with intention</div>
    </div>
  );
}
