import React from 'react';
import styled from 'styled-components';
import CodeCard from './CodeCard';
import ResponsiveCard from './ResponsiveCard';
import InteractiveCard from './InteractiveCard';

const Principles = styled.section`
  text-align: center;

  .principles-header {
    text-align: center;
    margin-bottom: 5rem;
  }

  .principles-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.15;
    max-width: 700px;
    margin: 0 auto;
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .principle-card {
    background: var(--navy-mid);
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
    cursor: default;
    text-align: left;
  }

  .principle-card#pc2 {
    &.p2-tablet .pc2-inner { 
      max-width: 74%; 
      border-right: 2px solid rgba(201,169,110,0.12); 
    }
    &.p2-mobile .pc2-inner { 
      max-width: 52%; 
      border-right: 2px solid rgba(126,231,135,0.18); 
    }
    &.p2-mobile .pc2-inner p { 
      font-size: 0.88rem; 
      line-height: 1.45; 
    }
    &.p2-mobile .pc2-label { 
      color: #7ee787; 
    }
  }

  .principle-num {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 900;
    color: rgba(201,169,110,0.12);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .principle-card p {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.6;
    color: var(--muted);
  }

  /* pc1 Python Compile Card */
  .pc1-prose {
    transition: opacity 0.32s ease, transform 0.32s ease;
  }
  
  #pc1:hover .pc1-prose {
    opacity: 0;
    transform: translateY(-10px);
  }

  .pc1-terminal {
    position: absolute;
    inset: 0;
    padding: 1.25rem 1.5rem;
    background: #0d1117;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.32s ease, transform 0.32s ease;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  #pc1:hover .pc1-terminal {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-bottom: 0.65rem;
    margin-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .t-dot { width: 9px; height: 9px; border-radius: 50%; }
  .t-dot-r { background: #ff5f57; }
  .t-dot-y { background: #ffbd2e; }
  .t-dot-g { background: #28ca41; }

  .terminal-fname {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: rgba(255,255,255,0.22);
    margin-left: 6px;
    letter-spacing: 0.04em;
  }

  .terminal-pre {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    line-height: 1.65;
    margin: 0;
    white-space: pre-wrap;
    flex: 1;
    overflow: hidden;
    color: rgba(201,169,110,0.85);
  }

  .t-cursor {
    display: inline-block;
    width: 6px; height: 0.9em;
    background: var(--gold);
    opacity: 0.75;
    vertical-align: text-bottom;
    animation: tblink 0.9s step-end infinite;
  }

  @keyframes tblink { 0%,100%{opacity:0.75} 50%{opacity:0} }
  .t-cm  { color: #4a5568; }
  .t-kw  { color: #d2a8ff; }
  .t-fn  { color: #e2c08d; }
  .t-st  { color: #a5d6ff; }
  .t-bo  { color: #79c0ff; }
  .t-pu  { color: #c9d1d9; }

  /* pc2 Responsive Morph Card */
  .pc2-label {
    visibility: hidden;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    opacity: 0;
    margin-bottom: 0.65rem;
    transition: opacity 0.3s ease, visibility 0.3s ease, color 0.4s ease;
    text-align: left;
    text-transform: uppercase;
  }

  #pc2:hover .pc2-label {
    visibility: visible;
    opacity: 1;
  }

  .pc2-inner {
    transition: max-width 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                border-right 0.75s ease;
    max-width: 100%;
    overflow: hidden;
    text-align: left;
  }

  .pc2-inner p {
    transition: font-size 0.55s ease, line-height 0.55s ease;
  }

  /* pc3 Glow + Parallax Card */
  #pc3 {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.45s ease,
                background 0.45s ease;
  }

  #pc3:hover {
    transform: translateY(-7px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.6),
                inset 0 0 0 1px rgba(201,169,110,0.38);
    background: linear-gradient(145deg, rgba(201,169,110,0.07) 0%, var(--navy-mid) 55%);
  }

  .pc3-glow {
    position: absolute;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 65%);
    pointer-events: none;
    transform: translate(-50%,-50%);
    transition: opacity 0.35s ease;
    will-change: left, top;
  }

  .pc3-num {
    display: inline-block;
    will-change: transform;
  }

  .pc3-reveal {
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
  }

  #pc3:hover .pc3-reveal {
    opacity: 0.82;
    transform: translateY(0);
  }
`;

export default function PrinciplesSection() {
  return (
    <Principles className="section" id="principles">
      <div className="principles-header reveal">
        <p className="principles-eyebrow">How I Work</p>
        <div className="h2-wrap">
          <h2>Core Principles</h2>
          <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
        </div>
      </div>
      <div className="principles-grid reveal reveal-delay-1">
        {/* Card 1 — Python compile typewriter */}
        <CodeCard />

        {/* Card 2 — Responsive layout morph */}
        <ResponsiveCard />

        {/* Card 3 — Glow + parallax + reveal */}
        <InteractiveCard />
      </div>
    </Principles>
  );
}
