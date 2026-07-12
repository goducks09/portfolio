import React from 'react';
import styled from 'styled-components';
import { SectionWrapper, RevealWrapper, SectionLabel, H2Wrap, SectionUnderline } from './shared';

const Skills = styled(SectionWrapper)`
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;

const SkillsHeader = styled(RevealWrapper)`
  text-align: center;
  margin-bottom: 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(RevealWrapper)`
  background: var(--navy-mid);
  padding: 2.5rem;
  transition: background 0.3s ease;
  cursor: default;
  text-align: left;

  &:hover {
    background: rgba(201,169,110,0.04);
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0;
  }

  li {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.45;
    padding-left: 1rem;
    position: relative;
  }

  li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gold);
    opacity: 0.5;
    font-size: 0.75rem;
  }
`;

const SkillCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SkillIcon = styled.div`
  width: 44px; height: 44px;
  border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  flex-shrink: 0;
`;

const SkillName = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
`;

export default function SkillsSection() {
  return (
    <Skills id="skills">
      <SkillsHeader>
        <SectionLabel $align="center">Expertise</SectionLabel>
        <H2Wrap>
          <h2>Skills</h2>
          <SectionUnderline $origin="center" />
        </H2Wrap>
      </SkillsHeader>
      <SkillsGrid>
        <SkillCard>
          <SkillCardTop>
            <SkillIcon>Py</SkillIcon>
            <SkillName>Backend Engineering</SkillName>
          </SkillCardTop>
          <ul>
            <li>Professional experience building backend systems with Python and Flask</li>
            <li>REST API development and third-party integrations</li>
            <li>Experience working across full-stack application architecture</li>
          </ul>
        </SkillCard>
        <SkillCard $delay={0.1}>
          <SkillCardTop>
            <SkillIcon>Re</SkillIcon>
            <SkillName>Frontend Development</SkillName>
          </SkillCardTop>
          <ul>
            <li>Experience with React and modern JavaScript</li>
            <li>Responsive UI development with accessibility in mind</li>
            <li>Interactive interfaces using modern CSS and animation</li>
          </ul>
        </SkillCard>
        <SkillCard $delay={0.2}>
          <SkillCardTop>
            <SkillIcon>DB</SkillIcon>
            <SkillName>Data &amp; Infrastructure</SkillName>
          </SkillCardTop>
          <ul>
            <li>PostgreSQL and relational database design</li>
            <li>Docker-based development workflows and CI/CD exposure</li>
            <li>Git version control and collaborative development practices</li>
          </ul>
        </SkillCard>
        <SkillCard $delay={0.3}>
          <SkillCardTop>
            <SkillIcon>AI</SkillIcon>
            <SkillName>AI &amp; Emerging Tech</SkillName>
          </SkillCardTop>
          <ul>
            <li>Experience using Google Antigravity and Claude Code for AI-assisted development</li>
            <li>Hands-on experimentation with LangChain and Hugging Face for RAG workflows and model fine-tuning</li>
            <li>Exposure to Google Cloud Platform environments</li>
          </ul>
        </SkillCard>
      </SkillsGrid>
    </Skills>
  );
}
