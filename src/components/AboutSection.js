import React from 'react';
import styled from 'styled-components';

const About = styled.section`
  .section-heading {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 400;
    line-height: 1.35;
    color: var(--white);
  }

  .section-body {
    margin-top: 1.5rem;
    color: var(--muted);
    line-height: 1.8;
    font-size: 1rem;
    font-weight: 300;
  }
`;

export default function AboutSection() {
  return (
    <About className="section" id="about">
      <div className="reveal">
        <span className="section-label">About Me</span>
        <div className="h2-wrap block">
          <h2 className="section-heading">
            Bridging the gap between engineering and the user.
          </h2>
          <div className="section-underline"></div>
        </div>
        <p className="section-body">
          I found my passion for programming a few years ago while automating processes at George Fox University. I've been hooked ever since — learning different languages and building projects ranging from websites to full-stack applications.
        </p>
        <p className="section-body">
          Having a background in business and customer service gives me a unique edge: I understand projects from both the technical side and the administrative and client perspectives. I'm especially strong in attention to detail, problem-solving, and communication. I have extensive experience being an essential member of a team while also being able to work independently.
        </p>
        <p className="section-body">
          Outside of work, I enjoy a variety of music, movies, and gaming, and consider myself a lifelong learner.
        </p>
      </div>
    </About>
  );
}
