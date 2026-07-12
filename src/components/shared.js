import styled, { keyframes } from 'styled-components';

export const fadeUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionWrapper = styled.section`
  position: relative;
  padding: 8rem 0;
`;



export const SectionLabel = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 1rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.75rem;
  display: block;
  text-align: ${props => props.$align || 'left'};
`;

export const SectionUnderline = styled.div`
  height: 3px;
  background: linear-gradient(to right, var(--gold), rgba(201,169,110,0.35));
  width: 100%;
  transform: scaleX(0);
  transform-origin: ${props => props.$origin || 'left'};
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 0.6rem;
`;

export const H2Wrap = styled.div.attrs({ className: 'h2-wrap' })`
  display: inline-block;
  position: relative;

  ${props => props.$block && `
    display: block;
  `}

  &[data-active="true"] ${SectionUnderline} {
    transform: scaleX(1);
  }

  h2 {
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
                letter-spacing 0.55s ease 0.05s;
  }

  &[data-active="true"] h2 {
    transform: translateY(-4px);
    letter-spacing: 0.01em;
  }
`;

export const RevealWrapper = styled.div.attrs({ className: 'reveal' })`
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  ${props => typeof props.$delay === 'number' ? `transition-delay: ${props.$delay}s;` : ''}

  &[data-visible="true"] {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PrincipleCardWrapper = styled.div`
  background: var(--navy-mid);
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  cursor: default;
  text-align: left;

  p {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.6;
    color: var(--muted);
  }
`;

export const PrincipleNum = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 900;
  color: rgba(201,169,110,0.45);
  line-height: 1;
  margin-bottom: 1rem;
`;
