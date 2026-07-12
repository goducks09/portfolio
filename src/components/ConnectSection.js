import React from 'react';
import styled from 'styled-components';

const Connect = styled.section`
  text-align: center;
  padding: 8rem 0 4rem;

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0;
  }

  .connect-body {
    max-width: 520px;
    margin: 0 auto 3rem;
    color: var(--muted);
    line-height: 1.8;
    font-weight: 300;
  }

  .connect-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .connect-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 2rem;
    border: 1px solid rgba(255,255,255,0.15);
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    transition: all 0.3s ease;
  }

  .connect-btn:hover {
    background: var(--gold-dim);
    border-color: rgba(201,169,110,0.4);
    color: var(--gold);
  }

  .connect-btn svg {
    width: 16px; height: 16px;
    flex-shrink: 0;
    fill: currentColor;
  }
`;

export default function ConnectSection() {
  return (
    <Connect className="section" id="connect">
      <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--line), transparent)', margin: '0 auto 3rem' }}></div>
      <div className="reveal">
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Let's Talk</span>
        <div className="h2-wrap" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', display: 'inline-block' }}>Connect With Me</h2>
          <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
        </div>
        <p className="connect-body">
          Looking to hire a full-time developer, or a developer wanting to connect with peers? I'd love to hear from you. You can find all of my work on GitHub, or reach me directly through LinkedIn.
        </p>
        <div className="connect-links">
          <a href="https://github.com/goducks09" target="_blank" rel="noopener noreferrer" className="connect-btn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/chris-pulver/" target="_blank" rel="noopener noreferrer" className="connect-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </Connect>
  );
}
