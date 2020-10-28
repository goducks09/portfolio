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

const Title = styled.h1 `
  color: white;
  font-size: 3.75rem;
`;

const MainImg = styled.img`
  height: auto;
  margin 5% auto;
  width: 50%;
`;

const ProjectSection = styled.section`
  background: #E5E9EB;
  display: flex;
  text-align: left;

  & .side {
    flex: 0 0 20%;
    text-align: center;
  }

  & .main {
    background: #F1F1F1;
    border: 2px solid rgba(235, 237, 238, 0.8);
    flex-basis: 80%;
    margin-right: 20%;
    padding: 0 10%;
  }
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
`;

export default function Page( context ) {
  return (
    <Layout>
      <ContentWrapper>
        <Title>{context.pageContext.title}</Title>
        <MainImg src={context.pageContext.image} alt='Project design'></MainImg>
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
      </ContentWrapper>
    </Layout>
  );
}

//TODO add conditional images based on the project. Save them to the images folder