import React from 'react';
import styled from 'styled-components';
import ProjectGallery from './projectGallery';
import { SectionWrapper, RevealWrapper, SectionLabel, H2Wrap, SectionUnderline, SectionHeading } from './shared';

const Projects = styled(SectionWrapper)``;

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
          <SectionHeading>Projects</SectionHeading>
          <SectionUnderline $origin="center" />
        </H2Wrap>
      </ProjectsHeader>
      <ProjectGallery pages={pages} />
    </Projects>
  );
}
