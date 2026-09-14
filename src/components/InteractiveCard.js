import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { PrincipleCardWrapper, PrincipleNum } from './shared';

const lerp = (a, b, t) => a + (b - a) * t;

const RevealText = styled.div`
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease 0.18s, transform 0.4s ease 0.18s;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(201,169,110,0.14);
`;

const Glow = styled.div`
  position: absolute;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 65%);
  pointer-events: none;
  transform: translate(-50%,-50%);
  transition: opacity 0.35s ease;
  will-change: left, top;
`;

const AnimatedNum = styled(PrincipleNum)`
  display: inline-block;
  will-change: transform;
`;

const InteractiveCardWrapper = styled(PrincipleCardWrapper)`
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.45s ease,
              background 0.45s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.6),
                inset 0 0 0 1px rgba(201,169,110,0.38);
    background: linear-gradient(145deg, rgba(201,169,110,0.07) 0%, var(--navy-mid) 55%);
  }

  &:hover ${RevealText} {
    opacity: 0.82;
    transform: translateY(0);
  }
`;

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

  useEffect(() => {
    return () => {
      if (pc3Raf.current) cancelAnimationFrame(pc3Raf.current);
    };
  }, []);

  return (
    <InteractiveCardWrapper
      role="presentation"
      ref={pc3CardRef}
      onMouseEnter={handlePc3MouseEnter}
      onMouseMove={handlePc3MouseMove}
      onMouseLeave={handlePc3MouseLeave}
    >
      <Glow
        aria-hidden="true"
        ref={pc3GlowRef}
        style={{ left: '50%', top: '50%', opacity: 0 }}
      />
      <AnimatedNum
        ref={pc3NumRef}
        style={{ transform: 'translate(0px, 0px)', transition: 'transform 0.12s linear' }}
      >
        03
      </AnimatedNum>
      <p>Create dynamic sites that keep users engaged.</p>
      <RevealText aria-hidden="true">Interactivity with intention</RevealText>
    </InteractiveCardWrapper>
  );
}
