import React from 'react';
import styled from 'styled-components';

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to bottom, transparent, var(--navy));
    pointer-events: none;
  }

  .hero-bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Playfair Display', serif;
    font-size: clamp(140px, 28vw, 380px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.04);
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.2s;
  }

  .hero-name {
    font-size: clamp(4rem, 12vw, 11rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.03em;
    background: linear-gradient(180deg, #ffffff 20%, rgba(255,255,255,0.2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1s ease forwards 0.4s;
  }

  .hero-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 1.75rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.9s;
  }

  .hero-scroll {
    position: absolute;
    bottom: clamp(2rem, 8vh, 6rem);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: heroScrollFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 2s,
               heroScrollPulse 2.5s ease-in-out infinite 2.8s;
  }

  .hero-scroll span {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-indent: 0.3em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
    transform-origin: top;
    animation: scrollLineScale 2.5s ease-in-out infinite 2.8s;
  }

  @keyframes heroScrollFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 0.5;
      transform: translate(-50%, 0);
    }
  }

  @keyframes heroScrollPulse {
    0%, 100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes scrollLineScale {
    0%, 100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.7);
    }
  }
`;

export default function HeroSection() {
  return (
    <Hero id="hero">
      <div className="hero-bg-text" aria-hidden="true">CHRIS</div>
      <div className="hero-content">
        <p className="hero-eyebrow">Software Engineer</p>
        <h1 className="hero-name">Chris<br />Pulver</h1>
        <p className="hero-title">Building Software to Solve Real Problems</p>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </Hero>
  );
}
