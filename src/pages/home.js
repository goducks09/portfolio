import React, { useEffect, useCallback, useState } from 'react';
import Layout from '../components/layout';
import Seo from '../components/Seo';

import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PrinciplesSection from '../components/PrinciplesSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ConnectSection from '../components/ConnectSection';
import DockNav from '../components/DockNav';

export const Head = () => (
  <Seo
    title="Chris Pulver | Software Engineer"
    description="Portland-based software engineer specializing in Python, React, and full-stack development."
  />
);

export default function Home({ data }) {
  // ── Active dock navigation state ──
  const [activeSection, setActiveSection] = useState('hero');

  // ── Callbacks for Observers passed to event-driven APIs ──
  const handleRevealIntersect = useCallback((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.dataset.visible = 'true';
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

    const h2Wraps = document.querySelectorAll('.h2-wrap');
    h2Wraps.forEach(wrap => {
      const r = wrap.getBoundingClientRect();
      if (r.top < viewMid) {
        wrap.dataset.active = 'true';
      } else {
        wrap.dataset.active = 'false';
      }
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
  const pages = data?.githubData?.data?.user?.pinnedItems?.nodes ?? [];

  return (
    <Layout>
      <HeroSection />

      <div className="main-wrap">
        <div className="timeline-line" aria-hidden="true"></div>

        <AboutSection />
        <PrinciplesSection />
        <SkillsSection />
        <ProjectsSection pages={pages} />
        <ConnectSection />
      </div>

      <DockNav activeSection={activeSection} />
    </Layout>
  );
}