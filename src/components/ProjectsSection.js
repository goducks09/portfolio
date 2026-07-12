import React from 'react';
import styled from 'styled-components';
import ProjectGallery from './projectGallery';

const Projects = styled.section`
  .projects-header {
    text-align: center;
    margin-bottom: 5rem;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;

export default function ProjectsSection({ pages }) {
  return (
    <Projects className="section" id="projects">
      <div className="projects-header reveal">
        <span className="section-label" style={{ textAlign: 'center' }}>View My Work</span>
        <div className="h2-wrap">
          <h2>Projects</h2>
          <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
        </div>
      </div>
      <ProjectGallery pages={pages} />
    </Projects>
  );
}
