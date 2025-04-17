import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  flex: 1;
  max-width: 720px;

  @media (max-width: 768px) {
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
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 0.1rem;
  color:rgb(255, 72, 0);
`;

const ProfileIcon = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 11px;
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-weight: 400;
`;

const ExperienceText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #4a4a4a;
  font-weight: 400;
`;

const CurrentWork = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #4a4a4a;
  font-weight: 400;
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
  return (
    <Section>
      <Content>
        <Title>Hell<ProfileIcon src="/images/pradyumnicon.png" alt="Pradyumn's profile icon" /></Title>
        <IntroText>
          I'm Pradyumn, an interaction designer blending design thinking with AI-powered prototyping and vibe-driven code.
        </IntroText>
        <ExperienceText>
          I've helped shape human-machine interactions for electric vehicles⚡, designed networked ecosystems for last-mile mobility <LinkHighlight href="https://in.linkedin.com/company/dispatch-network" target="_blank" rel="noopener noreferrer">@Dispatch Network↗</LinkHighlight>, and turned napkin sketches into functional prototypes using AI and code — no-code, low-code, and sometimes... full-code.
        </ExperienceText>
        <CurrentWork>
          Currently designing and prototyping at <LinkHighlight href="https://in.linkedin.com/company/dispatch-network" target="_blank" rel="noopener noreferrer">@Dispatch Network↗</LinkHighlight>.
        </CurrentWork>
      </Content>
    </Section>
  );
};

export default IntroSection; 