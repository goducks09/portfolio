import React from 'react';
import styled from 'styled-components';
import { SectionWrapper, SectionLabel, H2Wrap, RevealWrapper, SectionUnderline } from './shared';

const Heading = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.35;
  color: var(--white);
`;

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
        <SectionLabel>About Me</SectionLabel>
        <H2Wrap $block>
          <Heading>
            Bridging the gap between engineering and the user
          </Heading>
          <SectionUnderline />
        </H2Wrap>
        <BodyText>
          I found my passion for programming a few years ago while automating processes at George Fox University. I've been hooked ever since — learning different languages and building projects ranging from websites to full-stack applications.
        </BodyText>
        <BodyText>
          Having a background in business and customer service gives me a unique edge: I understand projects from both the technical side and the administrative and client perspectives. I'm especially strong in attention to detail, problem-solving, and communication. I have extensive experience being an essential member of a team while also being able to work independently.
        </BodyText>
        <BodyText>
          Outside of work, I enjoy a variety of music, movies, and gaming, and consider myself a lifelong learner.
        </BodyText>
      </RevealWrapper>
    </SectionWrapper>
  );
}
