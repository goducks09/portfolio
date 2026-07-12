import React from 'react';
import styled from 'styled-components';

const Skills = styled.section`
  .skills-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }

  .skills-sub {
    color: var(--muted);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    background: var(--navy-mid);
    padding: 2.5rem;
    transition: background 0.3s ease;
    cursor: default;
    text-align: left;
  }

  .skill-card:hover {
    background: rgba(201,169,110,0.04);
  }

  .skill-card-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .skill-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--gold);
    flex-shrink: 0;
  }

  .skill-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .skill-card ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0;
  }

  .skill-card li {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.45;
    padding-left: 1rem;
    position: relative;
  }

  .skill-card li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gold);
    opacity: 0.5;
    font-size: 0.75rem;
  }
`;

export default function SkillsSection() {
  return (
    <Skills className="section" id="skills">
      <div className="skills-header reveal">
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Expertise</span>
        <div className="h2-wrap">
          <h2>Skills</h2>
          <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
        </div>
      </div>
      <div className="skills-grid">
        <div className="skill-card reveal">
          <div className="skill-card-top">
            <div className="skill-icon">Py</div>
            <div className="skill-name">Backend Engineering</div>
          </div>
          <ul>
            <li>Professional experience building backend systems with Python and Flask</li>
            <li>REST API development and third-party integrations</li>
            <li>Experience working across full-stack application architecture</li>
          </ul>
        </div>
        <div className="skill-card reveal reveal-delay-1">
          <div className="skill-card-top">
            <div className="skill-icon">Re</div>
            <div className="skill-name">Frontend Development</div>
          </div>
          <ul>
            <li>Experience with React and modern JavaScript</li>
            <li>Responsive UI development with accessibility in mind</li>
            <li>Interactive interfaces using modern CSS and animation</li>
          </ul>
        </div>
        <div className="skill-card reveal reveal-delay-2">
          <div className="skill-card-top">
            <div className="skill-icon">DB</div>
            <div className="skill-name">Data &amp; Infrastructure</div>
          </div>
          <ul>
            <li>PostgreSQL and relational database design</li>
            <li>Docker-based development workflows and CI/CD exposure</li>
            <li>Git version control and collaborative development practices</li>
          </ul>
        </div>
        <div className="skill-card reveal reveal-delay-3">
          <div className="skill-card-top">
            <div className="skill-icon">AI</div>
            <div className="skill-name">AI &amp; Emerging Tech</div>
          </div>
          <ul>
            <li>Experience using Google Antigravity and Claude Code for AI-assisted development</li>
            <li>Hands-on experimentation with LangChain and Hugging Face for RAG workflows and model fine-tuning</li>
            <li>Exposure to Google Cloud Platform environments</li>
          </ul>
        </div>
      </div>
    </Skills>
  );
}
