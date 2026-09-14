import React from 'react';
import styled from 'styled-components';
import CodeCard from './CodeCard';
import ResponsiveCard from './ResponsiveCard';
import InteractiveCard from './InteractiveCard';
import { SectionWrapper, RevealWrapper, H2Wrap, SectionUnderline, SectionHeading } from './shared';

const Principles = styled(SectionWrapper)`
  text-align: center;
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
          <SectionHeading>Core Principles</SectionHeading>
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
