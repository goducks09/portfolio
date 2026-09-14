import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import { RevealWrapper } from './shared';

const PLACEHOLDER_SVGS = [
  // SVG 1 - Layout Structure mockup icon
  <svg viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="40" rx="3" fill="none" stroke="white" strokeWidth="2" /><line x1="10" y1="22" x2="90" y2="22" stroke="white" strokeWidth="2" /><rect x="16" y="28" width="20" height="3" rx="1" fill="white" /><rect x="16" y="34" width="35" height="3" rx="1" fill="white" /><rect x="16" y="40" width="28" height="3" rx="1" fill="white" /></svg>,
  // SVG 2 - Sphere/Global network mockup icon
  <svg viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="20" fill="none" stroke="white" strokeWidth="2" /><line x1="50" y1="10" x2="50" y2="50" stroke="white" strokeWidth="1.5" /><line x1="30" y1="30" x2="70" y2="30" stroke="white" strokeWidth="1.5" /><ellipse cx="50" cy="30" rx="20" ry="10" fill="none" stroke="white" strokeWidth="1.5" /></svg>,
  // SVG 3 - Modular component blocks mockup icon
  <svg viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="15" width="25" height="30" rx="2" fill="none" stroke="white" strokeWidth="2" /><rect x="55" y="20" width="25" height="25" rx="2" fill="none" stroke="white" strokeWidth="2" /><line x1="45" y1="30" x2="55" y2="30" stroke="white" strokeWidth="1.5" /></svg>,
  // SVG 4 - Interactive triangle/node mockup icon
  <svg viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,50 10,50" fill="none" stroke="white" strokeWidth="2" /><line x1="50" y1="20" x2="50" y2="42" stroke="white" strokeWidth="1.5" /><circle cx="50" cy="46" r="2" fill="white" /></svg>
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProjectCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8,13,24,0.92) 0%, rgba(8,13,24,0.4) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.75rem;
  transition: background 0.4s ease;
`;

const ProjectCardLinkText = styled.div`
  margin-top: 1rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const ProjectCardDesc = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  line-height: 1.2;
  color: var(--white);
`;

const ProjectPlaceholderBg = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 60%;
    opacity: 0.03;
    fill: none;
  }
`;

const Card = styled(RevealWrapper)`
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--navy-mid);
  border: 1px solid var(--line);
  cursor: pointer;

  &:hover ${ProjectCardImg} {
    transform: scale(1.07);
  }

  &:hover ${ProjectCardOverlay} {
    background: linear-gradient(to top, rgba(8,13,24,0.97) 0%, rgba(8,13,24,0.6) 60%, rgba(8,13,24,0.15) 100%);
  }

  &:hover ${ProjectCardLinkText} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FooterLink = styled(RevealWrapper)`
  margin-top: 2.5rem;
  text-align: center;

  a {
    font-family: 'DM Mono', monospace;
    font-size: 1rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--gold);
  }
`;

export default function ProjectGallery({ pages }) {
  if (!pages || pages.length === 0) return null;

  return (
    <>
      <Grid>
        {pages.map((project, index) => (
          <Link key={project.name} to={project.name}>
            <Card $delay={index * 0.1}>
              <ProjectPlaceholderBg aria-hidden="true">
                {PLACEHOLDER_SVGS[index % PLACEHOLDER_SVGS.length]}
              </ProjectPlaceholderBg>
              <ProjectCardImg
                src={project.openGraphImageUrl}
                alt={`${project.description} preview`}
                loading="lazy"
                width="800"
                height="500"
              />
              <ProjectCardOverlay>
                <ProjectCardDesc>{project.description}</ProjectCardDesc>
                <ProjectCardLinkText>View Project →</ProjectCardLinkText>
              </ProjectCardOverlay>
            </Card>
          </Link>
        ))}
      </Grid>
      <FooterLink $delay={0.3}>
        <a
          href="https://github.com/goducks09"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all repositories on GitHub →
        </a>
      </FooterLink>
    </>
  );
}