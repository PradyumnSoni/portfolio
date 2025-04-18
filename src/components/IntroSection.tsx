import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const Section = styled.section`
  flex: 1;
  max-width: 720px;
  position: sticky;
  top: 80px; // A bit below the navigation
  height: fit-content;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    max-width: 100%;
  }
`;

const Content = styled.div`
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 0.1rem;
  color:rgb(255, 72, 0);

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-weight: 400;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ExperienceText = styled.p<{ isExpanded: boolean }>`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #4a4a4a;
  font-weight: 400;

  @media (max-width: 768px) {
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.isExpanded ? 'unset' : '1'};
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
    margin-bottom: ${props => props.isExpanded ? '0.5rem' : '0rem'};
    transition: all 0.3s ease;
  }
`;

const CurrentWork = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color:rgb(143, 143, 143);
  font-weight: 400;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ReadMoreButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: rgb(255, 72, 0);
  font-size: 0.9rem;
  padding: 0.5rem 0;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: block;
    padding: 0.25rem 0;
  }
`;

const LinkHighlight = styled.a`
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const IntroSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current && contentRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.fromTo(sectionRef.current, 
          { opacity: 0, x: -50 },
          { 
            opacity: 1,
            x: 0,
            duration: 1
          }
        )
        .fromTo(contentRef.current.children, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8
          }, 
          "-=0.5"
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Section ref={sectionRef} style={{ opacity: 0 }}>
      <Content ref={contentRef}>
        <Title>Hey! <br />I'm Pradyumn</Title>
        <IntroText>
          An interaction designer blending design thinking with AI-powered prototyping and vibe-driven code.
        </IntroText>
        <ExperienceText isExpanded={isExpanded}>
          I've designed scaleable apps, dashboards, and websites from scratch, conducted intensive user research and testing, and helped shape human-machine interactions for electric vehicles with smartphones. I turn ideas into functional prototypes using AI and code — no-code, low-code, and sometimes... full-code.
        </ExperienceText>
        <ReadMoreButton onClick={toggleExpand}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </ReadMoreButton>
        <CurrentWork>
          Currently designing networked ecosystems for last-mile mobility at <LinkHighlight href="https://in.linkedin.com/company/dispatch-network" target="_blank" rel="noopener noreferrer">@Dispatch Network↗</LinkHighlight>
        </CurrentWork>
      </Content>
    </Section>
  );
};

export default IntroSection; 