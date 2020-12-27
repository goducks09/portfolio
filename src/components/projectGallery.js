import React from "react";
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Container = styled.div`
  display: grid;
  grid: [row1-start] "first second" 1fr [row1-end]
        [row2-start] "first third" 1fr [row2-end]
        [row3-start] "first last" 1fr [row3-end]
        / auto auto;
  height: 85vh;
  margin: auto;
  padding: 5% 0;
  width: 80%;

  & .item-container {
    overflow: hidden;
  }

  & .item-container:first-of-type {
    grid-area: first;
  }

  @media (max-width: 1550px) {
    width: 100%;
  }

  @media (max-width: 650px) {
    display: block;
    height: auto;

    & .item-container {
      height: 40vh;
      margin: 10% 0;
    }
  }
`;

const ProjectItem = styled.div`
  background: no-repeat center 65%/cover url(${props => props.image});
  height: 100%;
  transition: transform .5s;
  width: 100%;

  &:hover {
    transform: scale(1.1);
  }

  & h3 {
    color: #222;
    font-size: 2.75rem;
    margin: 0;
    padding-top: 20px;
    text-decoration: none;
  }

  @media (max-width: 719px) {
    & h3 {
      font-size: 2rem;
    }
  }

  @media (max-width: 650px) {
    background-position: left;

    & h3 {
      font-size: 2.25rem;
    }
  }
`;

export default function ProjectGallery(props) {
    return (
        <Container>
          {props.pages.map( project =>
              <div className='item-container' key={project.name}>
                <AniLink cover to={project.name} duration={.75} bg='linear-gradient(to right top, #f3f3f3, #e7e7e7, #dbdbdb, #d0d0d0, #c4c4c4, #c4c4c4, #c4c4c4, #c4c4c4, #d0d0d0, #dbdbdb, #e7e7e7, #f3f3f3)'>
                  <ProjectItem image={project.openGraphImageUrl}>
                      <h3>{project.description}</h3>
                  </ProjectItem>
                </AniLink>
              </div>
            )
          }
        </Container>
    );
}