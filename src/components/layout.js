import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --navy: #080d18;
    --navy-mid: #0f1724;
    --gold: #c9a96e;
    --gold-dim: rgba(201,169,110,0.15);
    --muted: #7a8699;
    --white: #f4f2ee;
    --line: rgba(255,255,255,0.08);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    background: var(--navy);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
  }

  /* ─── GRAIN OVERLAY ─── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 100;
  }

  /* ─── TYPOGRAPHY ─── */
  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  /* ─── LAYOUT ─── */
  .main-wrap {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem 12rem;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 5%, rgba(255,255,255,0.1) 95%, transparent 100%);
    transform: translateX(-50%);
    pointer-events: none;
  }

  #timeline-node {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 0 6px rgba(201,169,110,0.12), 0 0 20px rgba(201,169,110,0.25);
    pointer-events: none;
    z-index: 10;
    transform: translate(-50%, -50%);
    transition: opacity 0.45s ease;
  }

  /* ─── H2 WRAP + UNDERLINE ─── */
  .h2-wrap {
    display: inline-block;
    position: relative;
  }

  /* Block-level variant for left-aligned full-width headings */
  .h2-wrap.block {
    display: block;
  }

  .section-underline {
    height: 3px;
    background: linear-gradient(to right, var(--gold), rgba(201,169,110,0.35));
    width: 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    margin-top: 0.6rem;
  }

  .h2-wrap.active .section-underline {
    transform: scaleX(1);
  }

  /* h2 subtle lift when section is active */
  .h2-wrap h2 {
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
                letter-spacing 0.55s ease 0.05s;
  }

  .h2-wrap.active h2 {
    transform: translateY(-4px);
    letter-spacing: 0.01em;
  }

  /* ─── SECTIONS ─── */
  .section {
    position: relative;
    padding: 8rem 0;
  }

  .section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.75rem;
    display: block;
  }

  /* ─── FLOATING DOCK ─── */
  .dock {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.6rem 1rem;
    background: rgba(10,14,26,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 0.5rem 0.75rem;
    color: var(--muted);
    transition: color 0.2s ease, background 0.2s ease;
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .dock-item:hover {
    color: var(--white);
    background: rgba(255,255,255,0.06);
  }

  .dock-item.active {
    color: var(--gold);
  }

  .dock-item svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .dock-divider {
    width: 1px;
    height: 24px;
    background: rgba(255,255,255,0.08);
    margin: 0 0.25rem;
  }

  /* ─── REVEAL ANIMATIONS ─── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .section-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .section-grid > :last-child:not(.timeline-node) {
      display: none;
    }
    .timeline-line, #timeline-node {
      display: none;
    }
    .dock-item span {
      display: none;
    }
    .dock-item {
      padding: 0.5rem 0.6rem;
    }
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}