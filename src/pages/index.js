import React, {useState, useEffect, useRef} from "react";
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

  & ul {
    display: none;
  }
`;

export default function Home() {
  const [activeId, setActive] = useState(null);
  const [positions, setPositions] = useState({});
  // Use ref to access skills section once DOM is available
  const skills = useRef(true);
  //Get width of viewport, height of skills section, and find center
  const viewWidth = document.documentElement.clientWidth;
  const viewHeight = skills.current.offsetHeight;
  const viewCenterX = viewWidth/2;
  const viewCenterY = viewHeight/2;

  const handleToggle = (e) => {
    if(e.currentTarget.id === activeId) {
      setActive("none");
    } else {
      setActive(e.currentTarget.id);
    }
  };

  const updateClass = (id) => {
    let className;
    if (!activeId) {
      return;
    } else if (activeId === id) {
      className = "active";
    } else if (activeId === "none"){
      className = "inactive";
    } else {
      className = "to-left";
    }
    return className;
  }

  //Use ref to determine if first render to prevent effect from firing
  const firstUpdate = useRef(true);
  useEffect(() => {
    //if first render, don't run effect
    if (firstUpdate.current) {
      const skills = document.getElementsByClassName('skill');
      let js = {},
            react = {},
            css = {},
            html = {};

      for (var i = 0; i < skills.length; i++) {
        const skillX = skills[i].getBoundingClientRect().x;
        const skillY = skills[i].getBoundingClientRect().y;

        switch(skills[i].id) {
          case 'js':
            js = {x: skillX, y: skillY};
            break;
          case 'react':
            react = {x: skillX, y: skillY};
            break;
          case 'css':
            css = {x: skillX, y: skillY};
            break;
          case 'html':
            html = {x: skillX, y: skillY};
            break;
        }
      }
      setPositions({js, react, css, html});
      firstUpdate.current = false;
      return;
    }

    gsap.fromTo('.active', {
      x: function(index, target, targets) {
        const style = window.getComputedStyle(target);
        const matrix = style.getPropertyValue('transform');
        let fromX;

        if(matrix && matrix != 'none') {
          //Get transform css property from target and extract 'x' value
          let values = matrix.replace(/\s+/g, '');
          values = values.split()[0].split('(')[1].split(')')[0].split(',');
          fromX = values[4];
        }
        
        return fromX;
      },
      y: function(index, target, targets) {
        const style = window.getComputedStyle(target);
        const matrix = style.getPropertyValue('transform');
        let fromY;

        if(matrix && matrix != 'none') {
          //Get transform css property from target and extract 'y' value
          let values = matrix.replace(/\s+/g, '');
          values = values.split()[0].split('(')[1].split(')')[0].split(',');
          fromY = values[5];
        }
        console.log(`${target.id} from y: ${fromY}`);
        return fromY;
      }
      },
      {duration: 2,
        x: function(index, target, targets) {
          // get current 'x' position and height of element
          const style = window.getComputedStyle(target);
          const marginLeft = style.marginLeft;
          const marginRight = style.marginRight;
          const currentX = target.offsetLeft;
          const targetWidth = target.offsetWidth; //TODO figure out how to add margin as well
          return viewCenterX - currentX - (targetWidth/2);
        },
        y: 0
        //   function(index, target, targets) {
        //   //get current 'y' position and height of element
        //   const currentY = target.getBoundingClientRect().y;
        //   console.log(`${target.id} current y: ${currentY}`);
        //   const targetHeight = target.offsetHeight;
        //   console.log(`center y: ${viewCenterY}`);
        //   console.log(`${target.id} height: ${targetHeight}`);
        //   return viewCenterY - currentY - (targetHeight/2);
        // }
      }
    );
    gsap.to('.to-left',
      { duration: 2,
        x: function(index, target, targets) {
          const newX = target.offsetLeft;
          return -newX;
        },
        y: function(index, target, targets) {
          console.log(`${target.id} to-left y: ${index*75}`);
          return index * 75;
        }
      }
    );
    gsap.to('.inactive', {duration: 2, x: 0, y: 0});
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

      <FlexSection ref={skills} backgroundColor='#141414'>
        <SectionHeader>Skills</SectionHeader>
        <SkillContainer id='js' className={`${updateClass('js')} skill`} onClick={handleToggle} hoverColor='#f7eb13'>
          <div className='background-circle'></div>
          <img src="" alt="Javascript icon"></img>
          <ul>
            <li>I am well-versed in JS ES6 syntax</li>
            <li>I have a solid foundation in vanilla JS, in addition to experience with jQuery, Vue, and React</li>
          </ul>
        </SkillContainer>

        <SkillContainer  id='react' className={`${updateClass('react')} skill`} onClick={handleToggle} hoverColor='#61dbfb'>
          <div className='background-circle'></div>
          <img src="" alt="React icon"></img>
          <ul>
            <li>React is the library/framework in which I have the highest proficiency</li>
            <li>I've built multiple full stack applications using the MERN stack</li>
            <li>I have experience with the latest React syntax including React Router and Hooks</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='css' className={`${updateClass('css')} skill`} onClick={handleToggle} hoverColor='#1c6eac'>
          <div className='background-circle'></div>
          <img src="" alt="CSS icon"></img>
          <ul>
            <li>Lots of experience using newest CSS features like flexbox and animations</li>
            <li>Knowledgeable in SASS preprocessing</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='html' className={`${updateClass('html')} skill`} onClick={handleToggle} hoverColor='#db5928'>
          <div className='background-circle'></div>
          <img src="" alt="HTML icon"></img>
          <ul>
            <li>Fully competent in semantic HTML</li>
            <li>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </li>
          </ul>
        </SkillContainer>
      </FlexSection>

      <Section backgroundColor='#F3F3F3'>
        <SectionHeader>Take a Look at My Work</SectionHeader>
        <div className="project-container">
          <div className="project-item">
            <a href=""><h3>Stoller Website</h3></a>
          </div>

          <div className="project-item">
            <a href=""><h3>Digital Wallet App</h3></a>
          </div>

          <div className="project-item">
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
