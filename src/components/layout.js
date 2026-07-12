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

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .timeline-line, #timeline-node {
      display: none;
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