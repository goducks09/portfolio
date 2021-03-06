import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/layout';
import SkillList from '../components/skillList';
import ProjectGallery from '../components/projectGallery';
import DownArrow from '../images/down-arrow-48.png';
import LinkedinImg from '../images/linkedin-64.png';
import GitHubImg from '../images/gitHub-64.png';

gsap.registerPlugin(ScrollTrigger);

const Header = styled.header`
  background-color: #141414;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 75vh;
  padding: 25vh 0 0 3.125rem;

  & h1 {
    font-size: 2.5rem;
    opacity: 0;
  }

  & p {
    display: block;
    font-size: 2rem;
    padding: 0;
    opacity: 0;
  }

  & img {
    align-self: center;
    margin: auto 0 5%;
    opacity: 0;
    padding-right: 3.125rem;
    text-align: center;
  }

  @media (max-width: 1023px) {
    & img {
      margin: auto 0 12.5%;
    }
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
    text-align: center;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: normal;
  }
`;

const SectionHeader = styled.h2`
  flex-basis: 100%;
  font-size: 3.75rem;
  font-weight: bold;
  margin: 0 0 10%;

  @media (max-width: 1023px) {
    font-size: 3rem;
  }

  @media (max-width: 719px) {
    font-size: 2.5rem;
  }

  @media (max-width: 650px) {
    flex-basis: initial;
    margin-bottom: 10%;
    padding: 10% 0;
    width: 100%;
  }
`;

const SectionSubHeader = styled.span`
  font-size: 1.25rem;
  margin-top: -25%;
  width: 100%;

  @media (max-width: 719px) {
    font-size: 1rem;
    margin-top: -15%;
  }
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

  @media (max-width: 1023px) {
    font-size: 1.5rem;
  }

  @media (max-width: 650px) {
    margin: 5% 0;
  }
`;

export default function Home(context) {
  // Use ref to access skills section once DOM is available
  const skills = useRef(true);

  // ***ANIMATIONS***

  //animate header
  function animateHeader() {
    gsap.fromTo('h1', {y: -100}, {delay: .25, duration: .75, opacity: 1, y: 0} );
    gsap.fromTo('header p', {y: -100}, {delay: 1, duration: .75, opacity: 1, y: 0} );
    gsap.fromTo('header img', {y: -100}, {delay: 3.25, duration: 1.25, opacity: 1, y: 0} );
  }

  //animation for 'about' section
  function animateAbout() {
    let tl = gsap.timeline({
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
  }

  //animation for 'principles' section
  function animatePrinciples() {
     gsap.to('.scroll-list', {
      duration: 1,
      stagger: .75,
      scrollTrigger: {trigger: '#principles', scrub: true, pin: true},
      opacity: 1
    });
  }

  //Use ref to determine if first render to prevent effect from firing
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    //determine if first render
    if (firstUpdate.current) {
      animateHeader();
      animateAbout();
      animatePrinciples();
     
      //update ref to indicate page has rendered previously
      firstUpdate.current = false;
      return;
    }
  }, []);

  // retrieve list of projects
  let pages = [];
  if(context.data) {
    pages = context.data.githubData.data.user.pinnedItems.nodes;
  }
  
  return (
    <Layout>
      <Header>
        <h1>Hi, I'm Chris</h1>
        <p>I create interactive websites and web apps</p>
        <img src={DownArrow} alt="Down arrow"></img>
      </Header>

      <Section id='about' backgroundColor='#141414'>
        <SectionHeader>About Me</SectionHeader>
        <p>
          I found my passion for programming a few years ago while working on automating processes at George Fox University. From that point, I've loved learning different languages and working on various projects from websites to full-stack applications.
        </p>
        <Line className='line'></Line>
        <p>
          Having a degree and career in business and customer service gives me a unique advantage in that I not only understand projects from the technical side, but also what is required from an administrative and client perspective. I am especially skilled in attention to detail, problem solving, and being an effective communicator. I have extensive experience being an essential member of a team, while also being able to work independently.
        </p>
        <Line className='line-2'></Line>
        <p>
          Outside of work I enjoy a variety of music, movies, gaming, and consider myself a life-long learner.
        </p>
      </Section>

      <FlexSection id='principles' backgroundColor='linear-gradient(to bottom, #141414, #48548d 40%, #48548d 60%, #141414);'>
        <SectionHeader>My Core Development Principles</SectionHeader>

        <ul id='principle-list'>
          <RotatingLI className='scroll-list'>Write clean, maintainable code</RotatingLI>
          <RotatingLI className='scroll-list'>Responsive design that is cross-browser compatible</RotatingLI>
          <RotatingLI className='scroll-list'>Create dynamic sites that keep users engaged</RotatingLI>
        </ul>
      </FlexSection>

      <FlexSection ref={skills} backgroundColor='#141414'>
        <SectionHeader>Skills</SectionHeader>
        <SectionSubHeader>(Give one a click!)</SectionSubHeader>
        <SkillList />
      </FlexSection>

      <Section backgroundColor='#F3F3F3'>
        <div className='hero'></div>
        <SectionHeader className='hero-header'>View My Work</SectionHeader>
        <ProjectGallery pages={pages}/>
      </Section>

      <FlexSection backgroundColor='#141414'>
        <SectionHeader>Connect With Me</SectionHeader>
        <div>
          <p>You can view all my work by clicking on the Github link below.</p>
          <p>If you are looking for a full-time developer or are a developer wanting to connect with industry peers, please message me through LinkedIn. I look forward to chatting with you!</p>
        </div>
        <div>
          <a href="https://github.com/goducks09" target="_blank" rel="noopener noreferrer"><img className='logo-link' src={GitHubImg} alt="GitHub link"></img></a>
          <a href="https://www.linkedin.com/in/chris-pulver/" target="_blank" rel="noopener noreferrer"><img className='logo-link' src={LinkedinImg} alt="LinkedIn link"></img></a>
        </div>
      </FlexSection>

      <footer><a target="_blank" rel="noreferrer" href="https://icons8.com/icons/nolan">Icons by icons8</a></footer>
    </Layout>
  );
}
