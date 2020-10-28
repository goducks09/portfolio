import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Link } from 'gatsby';
import styled, {css, keyframes} from 'styled-components';
import Layout from '../components/layout';
import CSSImg from '../images/css-64.png';
import JSImg from '../images/javascript-64.png';
import HTMLImg from '../images/html-64.png';
import ReactImg from '../images/react-64.png';
import LinkedinImg from '../images/linkedin-48.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = styled.header`
  background-color: #141414;
  font-weight: bold;
  height: 100vh;
  padding: 25vh 0 0 3.125rem;

  & h1 {
    font-size: 2.5rem;
    opacity: 0;
  }

  & span {
    display: block;
    font-size: 2rem;
    opacity: 0;
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

  & p {
    font-size: 1.5rem;
    margin: 0 12.5%;
  }
`;

const SectionHeader = styled.h2`
  flex-basis: 100%;
  font-size: 3.75rem;
  font-weight: bold;
  margin: 0;
`;

const Line = styled.div`
  background: linear-gradient(to right, #8ab4ff,#e492ff);
  height: 5px;
  margin: 0 auto;
  width: 80%;
`;

const RotatingLI = styled.li`
  flex-basis: 25%;
  font-size: 2rem;
  opacity: 0;
  transition: transform 300ms ease;
  &:hover {
    transform: rotateX(-14deg) rotateY(14deg) rotateZ(0deg)
  }
`;

const SkillContainer = styled.div`
  align-self: start;
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
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
    opacity: 0.6;
    position: absolute;
    right: 0;
    top: 0;
    width: 25vw;
    z-index: -1;
  }

  &.active:hover .background-circle {
    background: unset;
    height: unset;
    width: unset;
  }

  & img {
    align-self: center;
  }

  & ul {
    opacity: 0;
    visibility: hidden;
  }
`;

const ProjectGallery = styled.div`
  display: grid;
  grid: [row1-start] "first second" 1fr [row1-end]
        [row2-start] "first third" 1fr [row2-end]
        [row3-start] "first last" 1fr [row3-end]
        / auto auto;
  height: 75vh;
  margin: 15% 0;
  width: 100%;

  & .item-container {
    overflow: hidden;
  }

  & .item-container:first-of-type {
    grid-area: first;
  }
`;

const ProjectItem = styled.div`
  background: no-repeat center/cover url(${props => props.image});
  height: 100%;
  width: 100%;

  &:hover {
    transform: scale(1.1);
  }

  & h3 {
    color: white;
    font-size: 2.75rem;
    margin: 0;
    text-decoration: none;
  }
`;

export default function Home(context) {
  const [activeId, setActive] = useState(null);
  const [bounce, setBounce] = useState(true);
  const timeline = useMemo(() => gsap.timeline({ paused: true }), []);
  
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
      setBounce(true);
    } else {
      setActive(e.currentTarget.id);
      setBounce(false);
    }
  };

  const updateClass = (id) => {
    let className;
    if (!activeId) {
      className = 'inactive';
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

  useEffect(() => {
    timeline.fromTo('.skill', { y: -10 }, {
      y: 15,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1
    });
  }, []);

  useEffect(() => {
    if (bounce) {
      timeline.play();
    } else {
      timeline.pause();
    }
  }, [bounce]);

  //Use ref to determine if first render to prevent effect from firing
  const firstUpdate = useRef(true);
  useEffect(() => {
    //determine if first render
    if (firstUpdate.current) {
      //animate header on first render
      gsap.fromTo('h1', {y: -100}, {delay: .25, duration: .75, opacity: 1, y: 0} );
      gsap.fromTo('header span', {y: -100}, {delay: 1, duration: .75, opacity: 1, y: 0} );
  
      //animation for 'about' section
      let tl = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger:{trigger: '.line', endTrigger: ".line-2", scrub: 1}
      });
      tl.from('.line', {
        scaleX: 0,
        transformOrigin: "left"
      })
      .from('.line-2', {
        scaleX: 0,
        transformOrigin: "right"
      });

      //animation for 'principles' section
      gsap.to('.scroll-list', {
        duration: 1,
        stagger: .75,
        scrollTrigger: {trigger: '#principles', scrub: true, pin: true},
        opacity: 1
      });

      //update ref to indicate page has rendered previously
      firstUpdate.current = false;

      return;
    }
    
    //animation for active skill
    gsap.fromTo('.active', {
      x: function(index, target, targets) {
        const style = window.getComputedStyle(target);
        const matrix = style.getPropertyValue('transform');
        let fromX;

        if(matrix && matrix !== 'none') {
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

        if(matrix && matrix !== 'none') {
          //Get transform css property from target and extract 'y' value
          let values = matrix.replace(/\s+/g, '');
          values = values.split()[0].split('(')[1].split(')')[0].split(',');
          fromY = values[5];
        }
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
          const targetWidth = target.offsetWidth;
          return viewCenterX - currentX - (targetWidth/2);
        },
        y: 0
      }
    );
    //animation to reveal skill list
    gsap.to('.active ul', {delay: .75, duration: 2, opacity: 1, visibility: 'visible'} );
    //animation for moving not selected skills to side
    gsap.to('.to-left',
      { duration: 2,
        x: function(index, target, targets) {
          const newX = target.offsetLeft;
          return -newX;
        },
        y: function(index, target, targets) {
          return index * 75;
        }
      }
    );
    //animation to revert skills to center
    gsap.to('.inactive', {duration: 2, x: 0, y: 0});
    //animation for hiding skill list
    gsap.to(['.to-left ul', '.inactive ul'], {duration: 1, opacity: 0} );
  }, [activeId]);

  // retrieve list of projects
  const pages = context.data.githubData.data.user.pinnedItems.nodes;
  
  return (
    <Layout>
      <Header>
        <h1>Hi, I'm Chris</h1>
        <span>I create interactive websites and web apps</span>
      </Header>

      <Section id='about' backgroundColor='#141414'>
        <SectionHeader>About Me</SectionHeader>
        <p>
          I found my passion for programming a few years ago while working on automating processes at George Fox. From that point, I've loved learning different languages and working on various projects from websites to full-stack applications.
        </p>
        <Line className='line'></Line>
        <p>
          My education and career background give me a unique advantage in understanding the business and customer side of projects in addition to the technology. I am especially skilled in attention to detail, problem solving, and being an effective communicator. I have extensive experience being an essential member of a team, while also being able to work independently.
        </p>
        <Line className='line-2'></Line>
        <p>
          Outside of work I enjoy a variety of music, movies, gaming, and consider myself a life-long learner.
        </p>
      </Section>

      <FlexSection id='principles' backgroundColor='linear-gradient(to bottom,#8AB4FF,#5291FF);'>
        <SectionHeader>My Core Development Principles</SectionHeader>

        <ul id='principle-list'>
          <RotatingLI className='scroll-list'>Write clean, maintainable code</RotatingLI>
          <RotatingLI className='scroll-list'>Responsive design that is cross-browser compatible</RotatingLI>
          <RotatingLI className='scroll-list'>Create dynamic sites that keep users engaged</RotatingLI>
        </ul>
      </FlexSection>

      <FlexSection ref={skills} backgroundColor='#141414'>
        <SectionHeader>Skills</SectionHeader>
        <SkillContainer id='js' className={`${activeId ? updateClass('js'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#f7eb13'>
          <div className='background-circle'></div>
          <img src={JSImg} alt="Javascript icon"></img>
          <ul>
            <li>I am well-versed in JS ES6 syntax</li>
            <li>I have a solid foundation in vanilla JS, in addition to experience with jQuery, Vue, and React</li>
          </ul>
        </SkillContainer>

        <SkillContainer  id='react' className={`${activeId ? updateClass('react'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#61dbfb'>
          <div className='background-circle'></div>
          <img src={ReactImg} alt="React icon"></img>
          <ul>
            <li>React is the library/framework in which I have the highest proficiency</li>
            <li>I've built multiple full stack applications using the MERN stack</li>
            <li>I have experience with the latest React syntax including React Router and Hooks</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='css' className={`${activeId ? updateClass('css'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#1c6eac'>
          <div className='background-circle'></div>
          <img src={CSSImg} alt="CSS icon"></img>
          <ul>
            <li>Lots of experience using newest CSS features like flexbox and animations</li>
            <li>Knowledgeable in SASS preprocessing</li>
          </ul>
        </SkillContainer>

        <SkillContainer id='html' className={`${activeId ? updateClass('html'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#db5928'>
          <div className='background-circle'></div>
          <img src={HTMLImg} alt="HTML icon"></img>
          <ul>
            <li>Fully competent in semantic HTML</li>
            <li>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </li>
          </ul>
        </SkillContainer>
      </FlexSection>

      <Section backgroundColor='#F3F3F3'>
        <div className='hero'></div>
        <SectionHeader className='hero-header'>Take a Look at My Work</SectionHeader>
        <ProjectGallery>
          {pages.map( project =>
              <div className='item-container' key={project.name}>
                <ProjectItem image={project.openGraphImageUrl}>
                    <Link href={project.name}><h3>{project.name}</h3></Link>
                </ProjectItem>
              </div>
            )
          }
        </ProjectGallery>
      </Section>

      <FlexSection backgroundColor='#141414'>
        <SectionHeader>Connect With Me</SectionHeader>
        <p>If you are looking for a full-time developer, or are a developer wanting to connect with industry peers, please message me through LinkedIn! I look forward to chatting with you!</p>
        <a href="https://www.linkedin.com/in/chris-pulver/" target="_blank"><img src={LinkedinImg} alt="LinkedIn link"></img></a>
      </FlexSection>
    </Layout>
  );
}
