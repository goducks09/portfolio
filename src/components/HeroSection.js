import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeUp } from './shared';

const heroScrollFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 0.5;
    transform: translate(-50%, 0);
  }
`;

const heroScrollPulse = keyframes`
  0%, 100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
`;

const scrollLineScale = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.7);
  }
`;

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to bottom, transparent, var(--navy));
    pointer-events: none;
  }
`;

const BgText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Playfair Display', serif;
  font-size: clamp(140px, 28vw, 380px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  user-select: none;
  white-space: nowrap;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const Eyebrow = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 1rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 0.8s ease forwards 0.2s;
`;

const Name = styled.h1`
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 20%, rgba(255,255,255,0.2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transform: translateY(30px);
  animation: ${fadeUp} 1s ease forwards 0.4s;
`;

const Title = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 1.75rem;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 0.8s ease forwards 0.9s;
`;

const ScrollWrapper = styled.div`
  position: absolute;
  bottom: clamp(2rem, 8vh, 6rem);
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: ${heroScrollFadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 2s,
             ${heroScrollPulse} 2.5s ease-in-out infinite 2.8s;

  span {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-indent: 0.3em;
    text-transform: uppercase;
    color: var(--muted);
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
  transform-origin: top;
  animation: ${scrollLineScale} 2.5s ease-in-out infinite 2.8s;
`;

export default function HeroSection() {
  return (
    <Hero id="hero">
      <BgText aria-hidden="true">CHRIS</BgText>
      <Content>
        <Eyebrow>Software Engineer</Eyebrow>
        <Name>Chris<br />Pulver</Name>
        <Title>Built to Solve Problems</Title>
      </Content>
      <ScrollWrapper aria-hidden="true">
        <span>Scroll</span>
        <ScrollLine />
      </ScrollWrapper>
    </Hero>
  );
}
