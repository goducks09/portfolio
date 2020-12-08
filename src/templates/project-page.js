import React from "react";
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import Layout from "../components/layout";

const ContentWrapper = styled.div`
  background: #333;
  color: #333;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
//added position and z-index
const Title = styled.h1 `
  color: #222;
  font-size: 3.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: 491px) {
    font-size: 2.75rem;
  }
`;

const MainImg = styled.div`
  background: left/cover no-repeat;
  height: 750px;
  position: fixed;
  width: 100%;

  @media (max-width: 491px) {
    height: 500px;
  }
`;

//added position and margin-top
const ProjectSection = styled.section`
  background: #E5E9EB;
  display: flex;
  position: relative;
  text-align: left;

  &:first-of-type {
    margin-top: 575px;
  }

  & .side {
    flex: 0 0 20%;
    text-align: center;
    padding: 5% 2%;
  }

  & .main {
    background: #F1F1F1;
    border: 2px solid rgba(235, 237, 238, 0.8);
    flex-basis: 80%;
    margin-right: 20%;
    padding: 5%;
  }

  & ul {
    margin-left: 5%;
  }

  @media (max-width: 719px) {
    flex-direction: column;

    & .side {
      padding: 0;
    }
    
    & .main {
      margin: initial;
    }

    @media (max-width: 491px) {
      &:first-of-type {
        margin-top: 375px;
      }
    }
  }
`;

const SectionHeader = styled.h2`
  color: #555;
  font-size: 1.25rem;
  font-weight: 400;

  @media (max-width: 719px) {
    font-size: 1.5rem;
  }
`;

export default function Page( context ) {
  console.log(`page: ${context.pageContext.url}`); 
  return (
    <Layout>
      <ContentWrapper>
        <Title>{context.pageContext.title}</Title>
        <MainImg  style={{backgroundImage: `url(${context.pageContext.image})`}}></MainImg>
        <ProjectSection>
          <div className='side'>
            <SectionHeader>Project Overview</SectionHeader>
          </div>
          <div className='main'>
            <ReactMarkdown source={context.pageContext.overview} escapeHtml={false} />
          </div>
        </ProjectSection>
        <ProjectSection>
          <div className='side'>
            <SectionHeader>Technologies</SectionHeader>
          </div>
          <div className='main'>
            <ul>{context.pageContext.technologies.map(technology => <li key={technology.topic.name}>{technology.topic.name}</li>)}</ul>
          </div>
        </ProjectSection>
        <ProjectSection>
          <div className='side'>
            <SectionHeader>View the Code</SectionHeader>
          </div>
          <div className='main'>
            <p><a href={context.pageContext.url} target="_blank" rel="noreferrer">Github Repository</a></p>
          </div>
        </ProjectSection>
      </ContentWrapper>
    </Layout>
  );
}