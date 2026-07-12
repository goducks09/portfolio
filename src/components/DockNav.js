import React from 'react';
import styled from 'styled-components';

const DockNavWrapper = styled.nav`
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
`;

const DockItem = styled.a`
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

  &:hover {
    color: var(--white);
    background: rgba(255,255,255,0.06);
  }

  &[data-active="true"] {
    color: var(--gold);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.6rem;
    span {
      display: none;
    }
  }
`;

const DockDivider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.08);
  margin: 0 0.25rem;
`;

export default function DockNav({ activeSection }) {
  return (
    <DockNavWrapper aria-label="Site navigation">
      <DockItem data-active={activeSection === 'hero' ? 'true' : 'false'} href="#hero" aria-label="Home">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
        <span>Home</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem data-active={activeSection === 'about' ? 'true' : 'false'} href="#about" aria-label="About">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <span>About</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem data-active={activeSection === 'principles' ? 'true' : 'false'} href="#principles" aria-label="Principles">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span>Principles</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem data-active={activeSection === 'skills' ? 'true' : 'false'} href="#skills" aria-label="Skills">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span>Skills</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem data-active={activeSection === 'projects' ? 'true' : 'false'} href="#projects" aria-label="Work">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
        <span>Work</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem data-active={activeSection === 'connect' ? 'true' : 'false'} href="#connect" aria-label="Connect">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
        </svg>
        <span>Connect</span>
      </DockItem>
      <DockDivider aria-hidden="true" />
      <DockItem href="https://github.com/goducks09" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
        </svg>
        <span>GitHub</span>
      </DockItem>
    </DockNavWrapper>
  );
}
