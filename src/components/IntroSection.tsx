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

const TooltipContainer = styled.span`
  position: relative;
  display: inline-block;
  color: #ff3000;
  line-height: 1.4;
  cursor: default;
  border-bottom: 1px dashed currentColor;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fffbf3;
  color: #ff3000;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  width: 350px;
  white-space: normal;
  text-align: center;
  margin-bottom: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 6px 50px rgb(218, 205, 202);

  ${TooltipContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 300px;
    white-space: normal;
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
    box-shadow: 0 6px 50px rgb(218, 205, 202);
    margin: 0;
    pointer-events: none;

    ${TooltipContainer}:active & {
      opacity: 1;
      visibility: visible;
    }

    &::after {
      display: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #fffbf3 transparent transparent transparent;
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
  color:rgb(70, 70, 70);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Description = styled.p<{ $isExpanded: boolean }>`
  color: #888888;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  max-height: ${props => props.$isExpanded ? '1000px' : '3.2em'};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
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
          An <TooltipContainer>interaction designer<Tooltip>Interaction designer, Product designer, UI/UX designer... we have many names! 😵‍💫</Tooltip></TooltipContainer> blending design thinking with AI-powered prototyping for everything digital.
        </IntroText>
        <ExperienceText isExpanded={isExpanded}>
          I've designed scaleable apps, dashboards, and websites from scratch, conducted intensive user research and testing, and helped shape human-machine interactions for electric vehicles with smartphones. I turn ideas into functional prototypes using AI and code — no-code, low-code, and sometimes... <TooltipContainer>full-code<Tooltip>Vibe coded this website in 17 minutes 🚀 + lot of custom touches and easter eggs 😋</Tooltip></TooltipContainer>.
        </ExperienceText>
        <ReadMoreButton onClick={toggleExpand}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </ReadMoreButton>
        <CurrentWork>
          Currently designing networked ecosystems for last-mile mobility <LinkHighlight href="https://in.linkedin.com/company/dispatch-network" target="_blank" rel="noopener noreferrer">@Dispatch Network↗</LinkHighlight>
        </CurrentWork>
      </Content>
    </Section>
  );
};

export default IntroSection; 