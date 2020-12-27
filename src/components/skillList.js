import React, {useState, useEffect, useMemo} from "react";
import styled from 'styled-components';
import { gsap } from 'gsap';
import CSSImg from '../images/css-64.png';
import JSImg from '../images/javascript-64.png';
import CodeImg from '../images/code-64.png';
import ReactImg from '../images/react-64.png';

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

  & img {
    align-self: center;
    cursor: pointer;
  }

  & ul {
    opacity: 0;
    padding-left: 7%;
    visibility: hidden;
  }

  @media (max-width: 1023px) {
    margin: 0;
  }

  @media (max-width: 650px) {
    align-self: initial;
    flex-basis: initial;
    min-height: 325px;
    justify-content: space-evenly;

    & ul {
      margin: 0 10%;
    }
  }
`;

export default function SkillList() {
    const [activeId, setActive] = useState(null);
    const [bounce, setBounce] = useState(true);
    const timeline = useMemo(() => gsap.timeline({ paused: true }), []);

    const handleToggle = (e) => {
        if(!gsap.isTweening('.active')) {
            if(e.currentTarget.id === activeId) {
            setActive("none");
            setBounce(true);
            } else {
            setActive(e.currentTarget.id);
            setBounce(false);
            }
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
    
    // check window is available for server rendering and then check size to enable animations
    let mq;
    if (typeof window !== 'undefined') {
        mq = window.matchMedia("(min-width: 650px)");
    }
    //Get width of viewport and find center
    let viewWidth;
    let viewCenterX;
    if (typeof document !== 'undefined') {
        viewWidth = document.documentElement.clientWidth;
        viewCenterX = viewWidth/2;
    }

    // **ANIMATIONS**

    //animation for active skill
    function animateActive() {
        gsap.fromTo('.active', {
            x: function(index, target, targets) {
                //Get transform css property from target and extract 'x' value
                const style = window.getComputedStyle(target);
                const matrix = style.getPropertyValue('transform');
                let fromX;

                if(matrix && matrix !== 'none') {
                let values = matrix.replace(/\s+/g, '');
                values = values.split()[0].split('(')[1].split(')')[0].split(',');
                fromX = values[4];
                }
                
                return fromX;
            },
            y: function(index, target, targets) {
                //Get transform css property from target and extract 'y' value
                const style = window.getComputedStyle(target);
                const matrix = style.getPropertyValue('transform');
                let fromY;

                if(matrix && matrix !== 'none') {
                let values = matrix.replace(/\s+/g, '');
                values = values.split()[0].split('(')[1].split(')')[0].split(',');
                fromY = values[5];
                }
                return fromY;
            }
        },
        {duration: 2,
            x: function(index, target, targets) {
            // get current 'x' position of element
            const currentX = target.offsetLeft;
            const targetWidth = target.offsetWidth;
            return viewCenterX - currentX - (targetWidth/2);
            },
            y: 0
        }
        );
    }

    //animation for moving non-selected skills to side
    function animateLeft() {
        gsap.to('.to-left',
        { duration: 2,
        x: function(index, target, targets) {
            const newX = target.offsetLeft;
            return -newX;
        },
        y: function(index, target, targets) {
            return index * 75;
        }
        });
    }

    //animation to revert skills to center
    function animateInactive() {
        gsap.to('.inactive', {duration: 2, x: 0, y: 0});
    }

    //animation for skill list
    function animateSkillList() {
        gsap.to('.active ul', {delay: .75, duration: 2, opacity: 1, visibility: 'visible'} );
        //animation for hiding skill list
        gsap.to(['.to-left ul', '.inactive ul'], {duration: 1, opacity: 0} );
    }

    //if the bounce state changes, play or pause the animation
    useEffect(() => {
        if (bounce) {
        timeline.play();
        } else {
        timeline.pause();
        }
    }, [bounce]);

    //cause 'skill' items to bounce continuosly if window matches min-width
    useEffect(() => {
        if(mq.matches) {
        timeline.fromTo('.skill', { y: -10 }, {
            y: 15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1
        });
        }
    }, []);

    //animate skills if one is clicked
    useEffect(() => {
        // If the window size matches the media query
        if(mq.matches) {
        animateActive();
        animateLeft();
        animateInactive();
        }
        animateSkillList();
        
    }, [activeId, viewCenterX]);

    return (
        <>
            <SkillContainer id='js' className={`${activeId ? updateClass('js'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#f7eb13'>
            <img src={JSImg} alt="Javascript icon"></img>
            <ul>
                <li>Well-versed in JS ES6 syntax</li>
                <li>Solid foundation in vanilla JS</li>
                <li>Experience with jQuery, Vue, and React</li>
            </ul>
            </SkillContainer>

            <SkillContainer  id='react' className={`${activeId ? updateClass('react'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#61dbfb'>
            <img src={ReactImg} alt="React icon"></img>
            <ul>
                <li>Highest proficiency in React</li>
                <li>Experience building multiple full stack applications using MERN</li>
                <li>Experience with the latest React syntax including React Router and Hooks</li>
            </ul>
            </SkillContainer>

            <SkillContainer id='code' className={`${activeId ? updateClass('code'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#db5928'>
            <img src={CodeImg} alt="Code icon"></img>
            <ul>
                <li>Professional experience with Python (Flask)</li>
                <li>Professional experience with PHP (Wordpress)</li>
                <li>Full-stack experience using NodeJS, MongoDB, and Express</li>
            </ul>
            </SkillContainer>

            <SkillContainer id='css' className={`${activeId ? updateClass('css'): 'inactive'} skill`} onClick={handleToggle} hoverColor='#1c6eac'>
            <img src={CSSImg} alt="CSS icon"></img>
            <ul>
                <li>Experience using newest CSS features like flexbox, grid, and animations</li>
                <li>Experience using Styled Components</li>
                <li>Knowledgeable in SASS preprocessing</li>
            </ul>
            </SkillContainer>
        </>
    );
}