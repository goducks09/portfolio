import React from 'react';
import styled from 'styled-components';
import CodeCard from './CodeCard';
import ResponsiveCard from './ResponsiveCard';
import InteractiveCard from './InteractiveCard';
import { SectionWrapper, RevealWrapper, H2Wrap, SectionUnderline } from './shared';

const Principles = styled(SectionWrapper)`
  text-align: center;

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.15;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const PrinciplesHeader = styled(RevealWrapper)`
  text-align: center;
  margin-bottom: 5rem;
`;

const PrinciplesEyebrow = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 1rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
`;

const PrinciplesGrid = styled(RevealWrapper)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function PrinciplesSection() {
  return (
    <Principles id="principles">
      <PrinciplesHeader>
        <PrinciplesEyebrow>How I Work</PrinciplesEyebrow>
        <H2Wrap>
          <h2>Core Principles</h2>
          <SectionUnderline $origin="center" />
        </H2Wrap>
      </PrinciplesHeader>
      <PrinciplesGrid $delay={0.1}>
        {/* Card 1 — Python compile typewriter */}
        <CodeCard />

        {/* Card 2 — Responsive layout morph */}
        <ResponsiveCard />

        {/* Card 3 — Glow + parallax + reveal */}
        <InteractiveCard />
      </PrinciplesGrid>
    </Principles>
  );
}
