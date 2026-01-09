import React, { useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  type?: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Card = styled.div<{ $image?: string }>`
  position: relative;
  border-radius: 14px;
  padding: 1.25rem;
  height: 80px;
  cursor: pointer;
  overflow: hidden;
  transform-origin: center;
  background-color: #e9e9e9;
  
  @media (max-width: 768px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.$image ? `url(${props.$image})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 1;
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
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    will-change: background;
  }
`;

const ImageLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 1;
  border-radius: 12px;
  will-change: transform, opacity;
`;

const OverlayLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  will-change: background;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  will-change: transform;

  @media (max-width: 768px) {
    margin-top: auto;
  }
`;

const Header = styled.div`
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: #ffffff;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const TypeChip = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  color: #000000;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  type,
  onClick,
  onMouseEnter,
  onMouseLeave 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    onMouseEnter();
    if (cardRef.current && contentRef.current && overlayRef.current) {
      const tl = gsap.timeline();
      
      tl.to(cardRef.current, {
        height: 400,
        duration: 0.7,
        ease: "power3.out"
      });
      
      if (imageRef.current) {
        tl.to(imageRef.current, {
          opacity: 1,
          scale: 1.05,
          duration: 0.7,
          ease: "power3.out"
        }, 0);
      }
      
      tl.to(overlayRef.current, {
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.15) 100%)",
        duration: 0.7,
        ease: "power3.out"
      }, 0)
      .to(contentRef.current, {
        y: 8,
        duration: 0.7,
        ease: "power3.out"
      }, 0);
    }
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    if (cardRef.current && contentRef.current && overlayRef.current) {
      const tl = gsap.timeline();
      
      tl.to(cardRef.current, {
        height: 100,
        duration: 0.7,
        ease: "power3.out"
      });
      
      if (imageRef.current) {
        tl.to(imageRef.current, {
          opacity: 0.95,
          scale: 1,
          duration: 0.7,
          ease: "power3.out"
        }, 0);
      }
      
      tl.to(overlayRef.current, {
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 100%)",
        duration: 0.7,
        ease: "power3.out"
      }, 0)
      .to(contentRef.current, {
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      }, 0);
    }
  };

  return (
    <Card 
      ref={cardRef}
      $image={image} 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image && (
        <ImageLayer 
          ref={imageRef} 
          style={{ backgroundImage: `url(${image})` }} 
        />
      )}
      <OverlayLayer ref={overlayRef} />
      {type && <TypeChip>{type}</TypeChip>}
      <Content ref={contentRef}>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
};

export default ProjectCard; 