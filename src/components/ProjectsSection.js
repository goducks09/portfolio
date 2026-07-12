import React from 'react';
import styled from 'styled-components';
import ProjectGallery from './projectGallery';
import { SectionWrapper, RevealWrapper, SectionLabel, H2Wrap, SectionUnderline } from './shared';

const Projects = styled(SectionWrapper)`
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;

const ProjectsHeader = styled(RevealWrapper)`
  text-align: center;
  margin-bottom: 5rem;
`;

export default function ProjectsSection({ pages }) {
  return (
    <Projects id="projects">
      <ProjectsHeader>
        <SectionLabel $align="center">View My Work</SectionLabel>
        <H2Wrap>
          <h2>Projects</h2>
          <SectionUnderline $origin="center" />
        </H2Wrap>
      </ProjectsHeader>
      <ProjectGallery pages={pages} />
    </Projects>
  );
}
