import React from "react";
import Markdown from 'react-markdown';
import styled from 'styled-components';
import Layout from "../components/layout";
import Seo from '../components/Seo';

const PageWrapper = styled.div`
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Hero = styled.header`
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #0f172a;
  color: #ffffff;
  padding: 4rem 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 2;
  }
`;

const HeroMockupImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.25;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
  padding-right: 2rem;

  @media (min-width: 768px) {
    opacity: 0.85;
    padding-right: 6rem;
  }

  @media (min-width: 1024px) {
    padding-right: 12rem;
  }

  img {
    width: 100%;
    max-width: 800px;
    object-fit: contain;
    object-position: right;
    transform: translateX(120px);
    transition: transform 0.5s ease;

    @media (max-width: 768px) {
      max-width: 450px;
      transform: translateX(80px);
    }
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 600px;

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin-bottom: 2rem;
    color: #ffffff;
    
    span {
      display: block;
      margin-top: 0.5rem;
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.2rem, 3.5vw, 1.8rem);
      font-weight: 400;
      color: #3b82f6;
      letter-spacing: -0.01em;
    }
  }
`;

const GithubButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2.25rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.4);
    color: #ffffff;
  }

  svg {
    margin-left: 0.5rem;
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const MainGrid = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const Sidebar = styled.aside`
  @media (min-width: 1024px) {
    grid-column: span 3;
  }

  nav {
    position: sticky;
    top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    display: block;
    padding: 0.6rem 1rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: #64748b;
    border-radius: 0.5rem;
    transition: all 0.25s ease;
  }

  .nav-link:hover {
    color: #0f172a;
    background-color: #f1f5f9;
  }

  .nav-link.active {
    color: #ffffff;
    background-color: #1e293b;
  }

  .case-details-box {
    margin-top: 2.5rem;
    padding: 1.5rem 1rem 0;
    border-top: 1px solid #e2e8f0;
  }

  .case-details-title {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #94a3b8;
    margin-bottom: 1rem;
  }

  .case-details-list {
    font-size: 0.85rem;
    color: #475569;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .case-details-item span {
    font-weight: 600;
    color: #0f172a;
  }
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (min-width: 1024px) {
    grid-column: span 9;
  }
`;

const Section = styled.section`
  scroll-margin-top: 3rem;
  text-align: left;

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
  }

  .prose {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #475569;
    font-weight: 300;

    p {
      margin-bottom: 1.5rem;
    }

    ul {
      margin-left: 1.5rem;
      list-style-type: disc;
      margin-bottom: 1.5rem;
      padding-left: 0.5rem;
      
      li {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const BadgeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.6rem 1.25rem;
  background-color: #1e293b;
  color: #ffffff;
  font-weight: 500;
  font-size: 0.82rem;
  border-radius: 9999px;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  &:hover {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    transform: translateY(-2px);
  }
`;

const FootnoteBox = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f1f5f9;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #475569;
    
    a {
      color: #3b82f6;
      font-weight: 600;
      text-decoration: underline;

      &:hover {
        color: #2563eb;
      }
    }
  }
`;

export const Head = () => <Seo />;

export default function Page(context) {
  const [activeSection, setActiveSection] = React.useState('overview');

  // Callback for sticky sidebar IntersectionObserver
  const handleSectionIntersect = React.useCallback((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0.3) {
        setActiveSection(id);
      }
    });
  }, []);

  React.useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(handleSectionIntersect, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));

    return () => {
      sections.forEach(s => observer.unobserve(s));
    };
  }, [handleSectionIntersect]);

  const { title, image, overview, technologies, url } = context.pageContext;

  return (
    <Layout>
      <PageWrapper>
        {/* Hero Section */}
        <Hero>
          <HeroMockupImage>
            <img src={image} alt={`${title} Mockup`} />
          </HeroMockupImage>
          <HeroContainer>
            <HeroContent>
              <h1>
                {title}
                <span>Case Study</span>
              </h1>
              <GithubButton href={url} target="_blank" rel="noreferrer">
                Github Repo
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </GithubButton>
            </HeroContent>
          </HeroContainer>
        </Hero>

        {/* Main Grid */}
        <MainGrid>
          {/* Sidebar */}
          <Sidebar>
            <nav aria-label="Case study sections">
              <a 
                href="#overview" 
                className={`nav-link ${activeSection === 'overview' ? 'active' : ''}`}
              >
                Overview
              </a>
              <a 
                href="#technologies" 
                className={`nav-link ${activeSection === 'technologies' ? 'active' : ''}`}
              >
                Technologies
              </a>
              <a 
                href="#view-code" 
                className={`nav-link ${activeSection === 'view-code' ? 'active' : ''}`}
              >
                View the Code
              </a>
              <div className="case-details-box">
                <h4 className="case-details-title">Case Details</h4>
                <div className="case-details-list">
                  <div className="case-details-item"><span>Date:</span> Jan 2026</div>
                  <div className="case-details-item"><span>Role:</span> Lead Developer</div>
                  <div className="case-details-item"><span>Platform:</span> Web Application</div>
                </div>
              </div>
            </nav>
          </Sidebar>

          {/* Main Content Body */}
          <ContentBody>
            {/* Overview */}
            <Section id="overview">
              <h2>Overview</h2>
              <div className="prose">
                <Markdown>{overview}</Markdown>
              </div>
            </Section>

            {/* Technologies */}
            <Section id="technologies">
              <h2>Technologies</h2>
              <div className="prose">
                <p>Built with modern architectural design, leveraging the following packages and tools:</p>
              </div>
              <BadgeGrid>
                {technologies.map(tech => (
                  <Badge key={tech.topic.name}>{tech.topic.name}</Badge>
                ))}
              </BadgeGrid>
            </Section>

            {/* View the Code */}
            <Section id="view-code">
              <h2>View the Code</h2>
              <div className="prose">
                <p>The code is fully open-source and hosted on GitHub under a clean repository configuration.</p>
              </div>
              <FootnoteBox>
                <h4>GitHub Repository</h4>
                <p>
                  Explore the codebase, read through commit structures, or clone it locally directly from the <a href={url} target="_blank" rel="noreferrer">GitHub Repository</a>.
                </p>
              </FootnoteBox>
            </Section>
          </ContentBody>
        </MainGrid>
      </PageWrapper>
    </Layout>
  );
}