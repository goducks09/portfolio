import React, { useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Seo from '../components/Seo';
import ProjectGallery from '../components/projectGallery';

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to bottom, transparent, var(--navy));
    pointer-events: none;
  }

  .hero-bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Playfair Display', serif;
    font-size: clamp(140px, 28vw, 380px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.04);
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.2s;
  }

  .hero-name {
    font-size: clamp(4rem, 12vw, 11rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.03em;
    background: linear-gradient(180deg, #ffffff 20%, rgba(255,255,255,0.2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1s ease forwards 0.4s;
  }

  .hero-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 1.75rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.9s;
  }

  .hero-scroll {
    position: absolute;
    bottom: 6rem;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: heroScrollFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 2s,
               heroScrollPulse 2.5s ease-in-out infinite 2.8s;
  }

  .hero-scroll span {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-indent: 0.3em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
    transform-origin: top;
    animation: scrollLineScale 2.5s ease-in-out infinite 2.8s;
  }

  @keyframes heroScrollFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 0.5;
      transform: translate(-50%, 0);
    }
  }

  @keyframes heroScrollPulse {
    0%, 100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes scrollLineScale {
    0%, 100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.7);
    }
  }
`;

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

const Principles = styled.section`
  text-align: center;

  .principles-header {
    text-align: center;
    margin-bottom: 5rem;
  }

  .principles-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.15;
    max-width: 700px;
    margin: 0 auto;
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .principle-card {
    background: var(--navy-mid);
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
    cursor: default;
    text-align: left;
  }

  .principle-card#pc2 {
    &.p2-tablet .pc2-inner { 
      max-width: 74%; 
      border-right: 2px solid rgba(201,169,110,0.12); 
    }
    &.p2-mobile .pc2-inner { 
      max-width: 52%; 
      border-right: 2px solid rgba(126,231,135,0.18); 
    }
    &.p2-mobile .pc2-inner p { 
      font-size: 0.88rem; 
      line-height: 1.45; 
    }
    &.p2-mobile .pc2-label { 
      color: #7ee787; 
    }
  }

  .principle-num {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 900;
    color: rgba(201,169,110,0.12);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .principle-card p {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.6;
    color: var(--muted);
  }

  /* pc1 Python Compile Card */
  .pc1-prose {
    transition: opacity 0.32s ease, transform 0.32s ease;
  }
  
  #pc1:hover .pc1-prose {
    opacity: 0;
    transform: translateY(-10px);
  }

  .pc1-terminal {
    position: absolute;
    inset: 0;
    padding: 1.25rem 1.5rem;
    background: #0d1117;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.32s ease, transform 0.32s ease;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  #pc1:hover .pc1-terminal {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-bottom: 0.65rem;
    margin-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .t-dot { width: 9px; height: 9px; border-radius: 50%; }
  .t-dot-r { background: #ff5f57; }
  .t-dot-y { background: #ffbd2e; }
  .t-dot-g { background: #28ca41; }

  .terminal-fname {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: rgba(255,255,255,0.22);
    margin-left: 6px;
    letter-spacing: 0.04em;
  }

  .terminal-pre {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    line-height: 1.65;
    margin: 0;
    white-space: pre-wrap;
    flex: 1;
    overflow: hidden;
    color: rgba(201,169,110,0.85);
  }

  .t-cursor {
    display: inline-block;
    width: 6px; height: 0.9em;
    background: var(--gold);
    opacity: 0.75;
    vertical-align: text-bottom;
    animation: tblink 0.9s step-end infinite;
  }

  @keyframes tblink { 0%,100%{opacity:0.75} 50%{opacity:0} }
  .t-cm  { color: #4a5568; }
  .t-kw  { color: #d2a8ff; }
  .t-fn  { color: #e2c08d; }
  .t-st  { color: #a5d6ff; }
  .t-bo  { color: #79c0ff; }
  .t-pu  { color: #c9d1d9; }

  /* pc2 Responsive Morph Card */
  .pc2-label {
    display: none;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    opacity: 0;
    margin-bottom: 0.65rem;
    transition: opacity 0.3s ease, color 0.4s ease;
    text-align: left;
    text-transform: uppercase;
  }

  #pc2:hover .pc2-label {
    display: block;
    opacity: 1;
  }

  .pc2-inner {
    transition: max-width 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                border-right 0.75s ease;
    max-width: 100%;
    overflow: hidden;
    text-align: left;
  }

  .pc2-inner p {
    transition: font-size 0.55s ease, line-height 0.55s ease;
  }

  /* pc3 Glow + Parallax Card */
  #pc3 {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.45s ease,
                background 0.45s ease;
  }

  #pc3:hover {
    transform: translateY(-7px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.6),
                inset 0 0 0 1px rgba(201,169,110,0.38);
    background: linear-gradient(145deg, rgba(201,169,110,0.07) 0%, var(--navy-mid) 55%);
  }

  .pc3-glow {
    position: absolute;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 65%);
    pointer-events: none;
    transform: translate(-50%,-50%);
    transition: opacity 0.35s ease;
    will-change: left, top;
  }

  .pc3-num {
    display: inline-block;
    will-change: transform;
  }

  .pc3-reveal {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.4s ease 0.18s, transform 0.4s ease 0.18s;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(201,169,110,0.14);
  }

  #pc3:hover .pc3-reveal {
    opacity: 0.82;
    transform: translateY(0);
  }
`;

const Skills = styled.section`
  .skills-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }

  .skills-sub {
    color: var(--muted);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    background: var(--navy-mid);
    padding: 2.5rem;
    transition: background 0.3s ease;
    cursor: default;
    text-align: left;
  }

  .skill-card:hover {
    background: rgba(201,169,110,0.04);
  }

  .skill-card-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .skill-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--gold);
    flex-shrink: 0;
  }

  .skill-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .skill-card ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0;
  }

  .skill-card li {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.45;
    padding-left: 1rem;
    position: relative;
  }

  .skill-card li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gold);
    opacity: 0.5;
    font-size: 0.75rem;
  }
`;

const Projects = styled.section`
  .projects-header {
    text-align: center;
    margin-bottom: 5rem;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;


const Connect = styled.section`
  text-align: center;
  padding: 8rem 0 4rem;

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0;
  }

  .connect-body {
    max-width: 520px;
    margin: 0 auto 3rem;
    color: var(--muted);
    line-height: 1.8;
    font-weight: 300;
  }

  .connect-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .connect-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 2rem;
    border: 1px solid rgba(255,255,255,0.15);
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    transition: all 0.3s ease;
  }

  .connect-btn:hover {
    background: var(--gold-dim);
    border-color: rgba(201,169,110,0.4);
    color: var(--gold);
  }

  .connect-btn svg {
    width: 16px; height: 16px;
    flex-shrink: 0;
    fill: currentColor;
  }
`;

const RAW = `def write_code() -> dict:\n    """Clean. Readable. Maintainable."""\n    return {\n        "readable":     True,\n        "maintainable": True,\n        "next_dev":     "grateful"\n    }`;

const TypewrittenCode = ({ state }) => {
  if (state.highlighted) {
    return (
      <>
        <span className="t-kw">def</span> <span className="t-fn">write_code</span><span className="t-pu">() -&gt; </span><span className="t-kw">dict</span>:{"\n"}
        {"    "}<span className="t-st">"""Clean. Readable. Maintainable."""</span>{"\n"}
        {"    "}<span className="t-kw">return</span> <span className="t-pu">{"{"}</span>{"\n"}
        {"        "}<span className="t-st">"readable"</span>:     <span className="t-bo">True</span>,{"\n"}
        {"        "}<span className="t-st">"maintainable"</span>: <span className="t-bo">True</span>,{"\n"}
        {"        "}<span className="t-st">"next_dev"</span>:     <span className="t-st">"grateful"</span>{"\n"}
        {"    "}<span className="t-pu">{"}"}</span>
      </>
    );
  }

  return (
    <>
      {state.text}
      {state.typing && <span className="t-cursor" />}
    </>
  );
};

export const Head = () => <Seo />;

export default function Home(context) {
  // ── Active dock navigation state ──
  const [activeSection, setActiveSection] = useState('hero');

  // ── Card 1: Typewriter Animation state ──
  const [pc1State, setPc1State] = useState({
    typing: false,
    text: '',
    highlighted: false,
    opacity: 1
  });
  const pc1Timer = useRef(null);
  const pc1CompileTimer = useRef(null);

  const startPc1Typing = useCallback(() => {
    if (pc1Timer.current) clearInterval(pc1Timer.current);
    if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);

    setPc1State({ typing: true, text: '', highlighted: false, opacity: 1 });
    let idx = 0;

    pc1Timer.current = setInterval(() => {
      if (idx < RAW.length) {
        const char = RAW[idx];
        setPc1State(prev => ({ ...prev, text: prev.text + char }));
        idx++;
      } else {
        clearInterval(pc1Timer.current);
        pc1CompileTimer.current = setTimeout(() => {
          setPc1State(prev => ({ ...prev, opacity: 0.2 }));
          setTimeout(() => {
            setPc1State(prev => ({ ...prev, highlighted: true, opacity: 1 }));
          }, 130);
        }, 360);
      }
    }, 18);
  }, []);

  const stopPc1Typing = useCallback(() => {
    if (pc1Timer.current) clearInterval(pc1Timer.current);
    if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);
    setPc1State({ typing: false, text: '', highlighted: false, opacity: 1 });
  }, []);

  // ── Card 2: Responsive Morph state ──
  const [pc2State, setPc2State] = useState('desktop');
  const pc2Timer = useRef(null);

  const startPc2Morph = useCallback(() => {
    setPc2State('desktop');
    const states = ['desktop', 'tablet', 'mobile'];
    let idx = 0;
    pc2Timer.current = setInterval(() => {
      idx = (idx + 1) % states.length;
      setPc2State(states[idx]);
    }, 1100);
  }, []);

  const stopPc2Morph = useCallback(() => {
    if (pc2Timer.current) clearInterval(pc2Timer.current);
    setPc2State('desktop');
  }, []);

  // ── Card 3: Glow & Parallax state ──
  const [pc3Glow, setPc3Glow] = useState({ left: '50%', top: '50%', opacity: 0 });
  const [pc3NumTransform, setPc3NumTransform] = useState('translate(0px, 0px)');
  const [pc3NumTransition, setPc3NumTransition] = useState('transform 0.12s linear');
  const pc3CardRef = useRef(null);
  const pc3Raf = useRef(null);
  const pc3MousePos = useRef({ mx: 0, my: 0 });
  const pc3GlowPos = useRef({ gx: 0, gy: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const tickPc3 = useCallback(() => {
    pc3GlowPos.current.gx = lerp(pc3GlowPos.current.gx, pc3MousePos.current.mx, 0.1);
    pc3GlowPos.current.gy = lerp(pc3GlowPos.current.gy, pc3MousePos.current.my, 0.1);
    setPc3Glow(prev => ({
      ...prev,
      left: `${pc3GlowPos.current.gx}px`,
      top: `${pc3GlowPos.current.gy}px`
    }));
    pc3Raf.current = requestAnimationFrame(tickPc3);
  }, []);

  const handlePc3MouseEnter = useCallback((e) => {
    if (!pc3CardRef.current) return;
    const r = pc3CardRef.current.getBoundingClientRect();
    const startX = r.width / 2;
    const startY = r.height / 2;
    pc3GlowPos.current = { gx: startX, gy: startY };
    pc3MousePos.current = { mx: startX, my: startY };
    setPc3Glow({ left: `${startX}px`, top: `${startY}px`, opacity: 1 });
    pc3Raf.current = requestAnimationFrame(tickPc3);
  }, [tickPc3]);

  const handlePc3MouseMove = useCallback((e) => {
    if (!pc3CardRef.current) return;
    const r = pc3CardRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    pc3MousePos.current = { mx, my };

    // Parallax: num moves at ~12% of cursor offset from center
    const dx = (mx - r.width / 2) * 0.12;
    const dy = (my - r.height / 2) * 0.12;
    setPc3NumTransform(`translate(${dx}px, ${dy}px)`);
  }, []);

  const handlePc3MouseLeave = useCallback(() => {
    if (pc3Raf.current) cancelAnimationFrame(pc3Raf.current);
    setPc3Glow(prev => ({ ...prev, opacity: 0 }));
    setPc3NumTransition('transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)');
    setPc3NumTransform('translate(0px, 0px)');
    setTimeout(() => {
      setPc3NumTransition('transform 0.12s linear');
    }, 620);
  }, []);

  // ── Callbacks for Observers passed to event-driven APIs ──
  const handleRevealIntersect = useCallback((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, []);

  const handleActiveSectionIntersect = useCallback((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        setActiveSection(id);
      }
    });
  }, []);

  // ── Main Page Scroll Effects ──
  const updateTimelineNode = useCallback(() => {
    const mainWrap = document.querySelector('.main-wrap');
    if (!mainWrap) return;

    const viewMid = window.innerHeight / 2;
    const timelineSections = mainWrap.querySelectorAll('section[id]');
    timelineSections.forEach(section => {
      const sr = section.getBoundingClientRect();
      const inside = sr.top < viewMid && sr.bottom > viewMid;
      section.classList.toggle('in-view', inside);
    });
  }, []);

  useEffect(() => {
    // 1. Reveal on scroll observer
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(handleRevealIntersect, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // 2. Active dock item observer
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(handleActiveSectionIntersect, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));

    // 3. Scroll & Resize listeners for timeline dot
    window.addEventListener('scroll', updateTimelineNode, { passive: true });
    window.addEventListener('resize', updateTimelineNode);
    updateTimelineNode();

    return () => {
      revealEls.forEach(el => revealObserver.unobserve(el));
      sections.forEach(s => sectionObserver.unobserve(s));
      window.removeEventListener('scroll', updateTimelineNode);
      window.removeEventListener('resize', updateTimelineNode);
    };
  }, [handleRevealIntersect, handleActiveSectionIntersect, updateTimelineNode]);

  // retrieve list of projects from static GraphQL data
  let pages = [];
  if (context.data) {
    pages = context.data.githubData.data.user.pinnedItems.nodes;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Hero id="hero">
        <div className="hero-bg-text" aria-hidden="true">CHRIS</div>
        <div className="hero-content">
          <p className="hero-eyebrow">Software Engineer</p>
          <h1 className="hero-name">Chris<br />Pulver</h1>
          <p className="hero-title">Building Software to Solve Real Problems</p>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </Hero>

      {/* Main timeline page wrapper */}
      <div className="main-wrap">
        <div className="timeline-line" aria-hidden="true"></div>

        {/* About Section */}
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

        {/* Principles Section */}
        <Principles className="section" id="principles">
          <div className="principles-header reveal">
            <p className="principles-eyebrow">How I Work</p>
            <div className="h2-wrap">
              <h2>Core Principles</h2>
              <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
            </div>
          </div>
          <div className="principles-grid reveal reveal-delay-1">
            {/* Card 1 — Python compile typewriter */}
            <div
              className="principle-card"
              id="pc1"
              onMouseEnter={startPc1Typing}
              onMouseLeave={stopPc1Typing}
            >
              <div className="pc1-prose">
                <div className="principle-num">01</div>
                <p>Write clean, maintainable code that the next developer can understand at a glance.</p>
              </div>
              <div className="pc1-terminal" aria-hidden="true" style={(pc1State.typing || pc1State.highlighted) ? { opacity: pc1State.opacity } : {}}>
                <div className="terminal-bar">
                  <span className="t-dot t-dot-r"></span>
                  <span className="t-dot t-dot-y"></span>
                  <span className="t-dot t-dot-g"></span>
                  <span className="terminal-fname">principle_01.py</span>
                </div>
                <pre className="terminal-pre">
                  <TypewrittenCode state={pc1State} />
                </pre>
              </div>
            </div>

            {/* Card 2 — Responsive layout morph */}
            <div
              className={`principle-card ${pc2State === 'tablet' ? 'p2-tablet' : pc2State === 'mobile' ? 'p2-mobile' : ''}`}
              id="pc2"
              onMouseEnter={startPc2Morph}
              onMouseLeave={stopPc2Morph}
            >
              <div className="principle-num">02</div>
              <div className="pc2-label">{pc2State}</div>
              <div className="pc2-inner">
                <p>Responsive design that is cross-browser compatible.</p>
              </div>
            </div>

            {/* Card 3 — Glow + parallax + reveal */}
            <div
              className="principle-card"
              id="pc3"
              ref={pc3CardRef}
              onMouseEnter={handlePc3MouseEnter}
              onMouseMove={handlePc3MouseMove}
              onMouseLeave={handlePc3MouseLeave}
            >
              <div
                className="pc3-glow"
                aria-hidden="true"
                style={{
                  left: pc3Glow.left,
                  top: pc3Glow.top,
                  opacity: pc3Glow.opacity
                }}
              />
              <div
                className="principle-num pc3-num"
                style={{
                  transform: pc3NumTransform,
                  transition: pc3NumTransition
                }}
              >
                03
              </div>
              <p>Create dynamic sites that keep users engaged.</p>
              <div className="pc3-reveal" aria-hidden="true">Interactivity with intention</div>
            </div>
          </div>
        </Principles>

        {/* Skills Section */}
        <Skills className="section" id="skills">
          <div className="skills-header reveal">
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Expertise</span>
            <div className="h2-wrap">
              <h2>Skills</h2>
              <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
            </div>
          </div>
          <div className="skills-grid">
            <div className="skill-card reveal">
              <div className="skill-card-top">
                <div className="skill-icon">Py</div>
                <div className="skill-name">Backend Engineering</div>
              </div>
              <ul>
                <li>Professional experience building backend systems with Python and Flask</li>
                <li>REST API development and third-party integrations</li>
                <li>Experience working across full-stack application architecture</li>
              </ul>
            </div>
            <div className="skill-card reveal reveal-delay-1">
              <div className="skill-card-top">
                <div className="skill-icon">Re</div>
                <div className="skill-name">Frontend Development</div>
              </div>
              <ul>
                <li>Experience with React and modern JavaScript</li>
                <li>Responsive UI development with accessibility in mind</li>
                <li>Interactive interfaces using modern CSS and animation</li>
              </ul>
            </div>
            <div className="skill-card reveal reveal-delay-2">
              <div className="skill-card-top">
                <div className="skill-icon">DB</div>
                <div className="skill-name">Data &amp; Infrastructure</div>
              </div>
              <ul>
                <li>PostgreSQL and relational database design</li>
                <li>Docker-based development workflows and CI/CD exposure</li>
                <li>Git version control and collaborative development practices</li>
              </ul>
            </div>
            <div className="skill-card reveal reveal-delay-3">
              <div className="skill-card-top">
                <div className="skill-icon">AI</div>
                <div className="skill-name">AI &amp; Emerging Tech</div>
              </div>
              <ul>
                <li>Experience using Google Antigravity and Claude Code for AI-assisted development</li>
                <li>Hands-on experimentation with LangChain and Hugging Face for RAG workflows and model fine-tuning</li>
                <li>Exposure to Google Cloud Platform environments</li>
              </ul>
            </div>
          </div>
        </Skills>

        {/* Work / Projects Section */}
        <Projects className="section" id="projects">
          <div className="projects-header reveal">
            <span className="section-label" style={{ textAlign: 'center' }}>View My Work</span>
            <div className="h2-wrap">
              <h2>Projects</h2>
              <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
            </div>
          </div>
          <ProjectGallery pages={pages} />
        </Projects>

        {/* Connect Section */}
        <Connect className="section" id="connect">
          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--line), transparent)', margin: '0 auto 3rem' }}></div>
          <div className="reveal">
            <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Let's Talk</span>
            <div className="h2-wrap" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', display: 'inline-block' }}>Connect With Me</h2>
              <div className="section-underline" style={{ transformOrigin: 'center' }}></div>
            </div>
            <p className="connect-body">
              Looking to hire a full-time developer, or a developer wanting to connect with peers? I'd love to hear from you. You can find all of my work on GitHub, or reach me directly through LinkedIn.
            </p>
            <div className="connect-links">
              <a href="https://github.com/goducks09" target="_blank" rel="noopener noreferrer" className="connect-btn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/chris-pulver/" target="_blank" rel="noopener noreferrer" className="connect-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </Connect>
      </div>

      {/* Floating Dock Site Navigation */}
      <nav className="dock" aria-label="Site navigation">
        <a className={`dock-item ${activeSection === 'hero' ? 'active' : ''}`} href="#hero" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            <path d="M9 21V12h6v9" />
          </svg>
          <span>Home</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className={`dock-item ${activeSection === 'about' ? 'active' : ''}`} href="#about" aria-label="About">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span>About</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className={`dock-item ${activeSection === 'principles' ? 'active' : ''}`} href="#principles" aria-label="Principles">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>Principles</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className={`dock-item ${activeSection === 'skills' ? 'active' : ''}`} href="#skills" aria-label="Skills">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span>Skills</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className={`dock-item ${activeSection === 'projects' ? 'active' : ''}`} href="#projects" aria-label="Work">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <span>Work</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className={`dock-item ${activeSection === 'connect' ? 'active' : ''}`} href="#connect" aria-label="Connect">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
          </svg>
          <span>Connect</span>
        </a>
        <div className="dock-divider" aria-hidden="true"></div>
        <a className="dock-item" href="https://github.com/goducks09" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
          </svg>
          <span>GitHub</span>
        </a>
      </nav>
    </Layout>
  );
}