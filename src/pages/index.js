import React, {useState, useEffect} from "react";
import styled, {css, keyframes} from "styled-components";
import Layout from "../components/layout";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

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
  justify-content: space-around;
`;

const SectionHeader = styled.h2`
  flex-basis: 100%;
  font-size: 3.75rem;
  font-weight: bold;
  margin: 0;
`;

const RotatingLI = styled.li`
  flex-basis: 25%;
  font-size: 2rem;
  transition: transform 300ms ease;
  &:hover {
    transform: rotateX(-14deg) rotateY(14deg) rotateZ(0deg)
  }
`;

//Animation for moving skill item when clicked. 'To' distance calculation (100%-basis)/2
const slideUp = keyframes`
  from {
    left: 0;
  }

  to {
    left: calc((100vw - 20%)/2);
  }
`;

//TODO change left ((100vw - flexbasis)/2) and bottom properties using animation https://styled-components.com/docs/basics#animations
const SkillContainer = styled.div`
  align-self: start;
  flex-basis: 20%;
  font-size: 1.25rem;
  margin: 0 25px;
  position: relative;
  text-align: left;
  z-index: 1;
  &:hover .background-circle {
    background: ${props => props.hoverColor};
    border-radius: 50%;
    bottom: 0;
    height: 25vw;
    margin: auto;
    opacity: 0.8;
    position: absolute;
    right: 0;
    top: 0;
    width: 25vw;
    z-index: -1;
  }
`;

export default function Home() {
  const [activeId, setActive] = useState("");

  const handleToggle = (e) => {
    setActive(e.currentTarget.id);
  };

  useEffect(() => {
    gsap.to('.active', {duration: 2, x: 300, y: 150});
    gsap.to('.pages__SkillContainer-hZnYWc:not(.active)', {duration: 2, x: 0, y: 0});
  }, [activeId]);

  return (
    <Layout>
      <Header>
        <h1>Hi, I'm Chris</h1>
        <span>I create interactive websites and web apps</span>
      </Header>

      <FlexSection backgroundColor='linear-gradient(to right, #3fb5a7, #3fb5a7 25%, #1a556a);'>
        <SectionHeader>My Core Development Principles</SectionHeader>

        <ul css={`
          display: flex;
          justify-content: space-around;
          margin: 0 0 10% 0;
        `}>
          <RotatingLI>Write clean, maintainable code</RotatingLI>
          <RotatingLI>Responsive design that is cross-browser compatible</RotatingLI>
          <RotatingLI>Create dynamic sites that keep users engaged</RotatingLI>
        </ul>
      </FlexSection>

      <FlexSection backgroundColor='#141414'>
        <SectionHeader>Skills</SectionHeader>
        <SkillContainer id='js' className={activeId==='js' ? "active" : null} onClick={handleToggle} hoverColor='#f7eb13'>
          <div class='background-circle'></div>
          <img src="" alt="Javascript icon"></img>
          <ul>
            <li>I am well-versed in JS ES6 syntax</li>
            <li>I have a solid foundation in vanilla JS, in addition to experience with jQuery, Vue, and React</li>
          </ul>
        </SkillContainer>

        <SkillContainer  id='react' className={activeId==='react' ? "active" : null} onClick={handleToggle} hoverColor='#61dbfb'>
          <div class='background-circle'></div>
          <img src="" alt="React icon"></img>
          <ul>
            <li>React is the library/framework in which I have the highest proficiency</li>
            <li>I've built multiple full stack applications using the MERN stack</li>
            <li>I have experience with the latest React syntax including React Router and Hooks</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='css' className={activeId==='css' ? "active" : null} onClick={handleToggle} hoverColor='#1c6eac'>
          <div class='background-circle'></div>
          <img src="" alt="CSS icon"></img>
          <ul>
            <li>Lots of experience using newest CSS features like flexbox and animations</li>
            <li>Knowledgeable in SASS preprocessing</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='html' className={activeId==='html' ? "active" : null} onClick={handleToggle} hoverColor='#db5928'>
          <div class='background-circle'></div>
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
