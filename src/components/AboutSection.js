import React from 'react';
import styled from 'styled-components';
import { SectionWrapper, SectionLabel, H2Wrap, RevealWrapper, SectionUnderline, SectionHeading } from './shared';

const BodyText = styled.p`
  margin-top: 1.5rem;
  color: var(--muted);
  line-height: 1.8;
  font-size: 1rem;
  font-weight: 300;
`;

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <RevealWrapper>
        <SectionLabel $align="center">About Me</SectionLabel>
        <H2Wrap $block>
          <SectionHeading>Creating software with a purpose</SectionHeading>
          <SectionUnderline />
        </H2Wrap>
        <BodyText>
          I'm a software engineer who writes code that solves problems. With a background in business, I understand that software needs to work, but it also needs to provide utility. That's why my process is to talk with stakeholders to understand their needs, then figure out how software can help. I did this at George Fox, where I met with HR partners to rebuild an employment orchestrator that no longer met their needs.
        </BodyText>
        <BodyText>
          Additionally, I've contributed to an enterprise timekeeping system and helped design and build a robust reservation system for an engineering maker lab. Celluphile is an app I built in my spare time to help organize my large movie library. Currently, I'm working on a tool to help identify spam and email phishing.
        </BodyText>
        <BodyText>
          When I'm not writing code, I'm usually listening to music, watching movies, or gaming.
        </BodyText>
      </RevealWrapper>
    </SectionWrapper>
  );
}
