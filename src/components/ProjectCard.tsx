import React from 'react';
import styled from 'styled-components';

interface ProjectCardProps {
  title: string;
  year: string;
  description: string;
  image?: string;
  link: string;
  onClick: () => void;
}

const Card = styled.div<{ image?: string }>`
  position: relative;
  border-radius: 12px;
  padding: 1.25rem;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  transform-origin: center;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.image ? `url(${props.image})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 0.95;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: background;
  }
  
  &:hover {
    height: 400px;
    
    &::before {
      opacity: 1;
      transform: scale(1.05);
    }

    &::after {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;

  ${Card}:hover & {
    transform: translateY(8px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: #ffffff;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Year = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ title, year, description, image, onClick }) => {
  return (
    <Card image={image} onClick={onClick}>
      <Content>
        <Header>
          <Title>{title}</Title>
          <Year>{year}</Year>
        </Header>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
};

export default ProjectCard; 