import React from "react";
import styled, {css} from "styled-components";
import Layout from "../components/layout";

const Header = styled.header`
  background-color: #141414;
  font-weight: bold;
  height: 100vh;
  padding: 25vh 0 0 3.125rem;

  > h1 {
    font-size: 2.5rem;
  }
  > span {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  background: ${props => props.backgroundColor};
  min-height: 100vh;
  text-align: center;
`;

const FlexSection = styled(Section)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SectionHeader = styled.h2`
  flex-basis: 100%;
  font-size: 3.75rem;
  font-weight: bold;
`;

const SkillContainer = styled.div`
  flex-basis: 20%;
`;

export default function Home() {
  return (
    <Layout>
      <Header>
        <h1>Hi, I'm Chris</h1>
        <span>I create interactive websites and web apps</span>
      </Header>

      <Section backgroundColor='linear-gradient(to right, #3fb5a7, #3fb5a7 25%, #1a556a);'>
        <SectionHeader>My Core Development Principles</SectionHeader>

        <ul css={`display: flex;`}>
          <li>Write clean, maintainable code</li>
          <li>Responsive design that is cross-browser compatible</li>
          <li>Create dynamic sites that keep users engaged</li>
        </ul>
      </Section>

      <FlexSection backgroundColor='#141414'>
        <SectionHeader>Skills</SectionHeader>

        <SkillContainer>
          <img src="" alt="Javascript icon"></img>
          <ul>
            <li>I am well-versed in JS ES6 syntax</li>
            <li>I have a solid foundation in vanilla JS, in addition to experience with jQuery, Vue, and React</li>
          </ul>
        </SkillContainer>

        <SkillContainer>
          <img src="" alt="React icon"></img>
          <ul>
            <li>React is the library/framework in which I have the highest proficiency</li>
            <li>I've built multiple full stack applications using the MERN stack</li>
            <li>I have experience with the latest React syntax including React Router and Hooks</li>
          </ul>
        </SkillContainer>

        <SkillContainer>
          <img src="" alt="CSS icon"></img>
          <ul>
            <li>Lots of experience using newest CSS features like flexbox and animations</li>
            <li>Knowledgeable in SASS preprocessing</li>
          </ul>
        </SkillContainer>

        <SkillContainer>
          <img src="" alt="HTML icon"></img>
          <ul>
            <li>Fully competent in semantic HTML</li>
            <li>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </li>
          </ul>
        </SkillContainer>
      </FlexSection>

      <Section backgroundColor='#F3F3F3'>
        <SectionHeader>Take a Look at My Work</SectionHeader>
        <div class="project-container">
          <div class="project-item">
            <a href=""><h3>Stoller Website</h3></a>
          </div>

          <div class="project-item">
            <a href=""><h3>Digital Wallet App</h3></a>
          </div>

          <div class="project-item">
            <a href=""><h3>Timekeeping App</h3></a>
          </div>
        </div>
      </Section>

      <Section backgroundColor='#141414'>
        <SectionHeader>Connect With Me</SectionHeader>
        <p>If you are looking for a full-time developer, or are a developer wanting to connect with industry peers, please message me through LinkedIn! I look forward to chatting with you!</p>
        <a href="www.linkedin.com" target="_blank"><img src="" alt="LinkedIn Link"></img></a>
      </Section>
    </Layout>
  );
}
