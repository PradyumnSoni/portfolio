import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import MobileProjectCarousel from './MobileProjectCarousel';
import gsap from 'gsap';

const Section = styled.section`
  flex: 1;
  max-width: 720px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: -0.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #888888;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    color: #ff3000;
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

const ProjectListContainer = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const DesktopProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileView = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const projects = [
  {
    title: 'Food For Thought',
    year: '2021',
    description: 'Interactive Dining Experience using AR',
    image: '/images/projects/Project-FoodForThought.jpg',
    link: 'https://pradyumn-projects.framer.website/foodforthought'
  },
  {
    title: 'DigiYatra',
    year: '2023',
    description: 'Redesigned for frequent-flyers\'s travel experience',
    image: '/images/projects/Project-Digiyatra.jpg',
    link: 'https://pradyumn-projects.framer.website/digiyatra'
  },
  {
    title: 'Urban Piper',
    year: '2024',
    description: 'India\'s Biggest Restaurant Management System',
    image: '/images/projects/Project-UrbanPiper.jpg',
    link: 'https://www.figma.com/design/zCdwM635w0k8uOQxZ00i8e/UrbanPiper---Pradyumn?node-id=201-780&t=WRywervlVUDJzQuG-1'
  },
  {
    title: 'SoulInk',
    year: '2022',
    description: 'An AI-powered kindle-like pad for new writers to explore new forms of writing',
    image: '/images/projects/Project-Soulink.jpg',
    link: 'https://pradyumn-projects.framer.website/soulink'
  },
  {
    title: 'Roots Minigardens',
    year: '2022',
    description: 'Logo Design for a terrarium brand',
    image: '/images/projects/Project-Roots.jpg',
    link: 'https://pradyumn-projects.framer.website/rootsminigardens'
  },
  {
    title: 'Louis Vuitton x Friday',
    year: '2023',
    description: 'Retelling Legacy by reviving the Heeled Boots for men',
    image: '/images/projects/Project-LouisVuitton.jpg',
    link: 'https://pradyumn-projects.framer.website/LVxFriday'
  }
];

interface ProjectsSectionProps {
  onProjectSelect: (link: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onProjectSelect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current && titleRef.current && listRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.fromTo(sectionRef.current, 
          { opacity: 0, x: 50 },
          { 
            opacity: 1,
            x: 0,
            duration: 1
          }
        )
        .fromTo(titleRef.current, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          "-=0.5"
        )
        .fromTo(listRef.current.children, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8
          },
          "-=0.4"
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (link: string, title: string) => {
    if (window.innerWidth <= 768 || title === 'Urban Piper') {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      onProjectSelect(link);
    }
  };

  return (
    <Section ref={sectionRef} style={{ opacity: 0 }}>
      <SectionTitle ref={titleRef}>My Work</SectionTitle>
      <ProjectListContainer>
        <DesktopProjectList ref={listRef}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              year={project.year}
              description={project.description}
              image={project.image}
              link={project.link}
              onClick={() => handleProjectClick(project.link, project.title)}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          ))}
        </DesktopProjectList>
        <MobileView>
          <MobileProjectCarousel 
            projects={projects}
            onProjectSelect={handleProjectClick}
          />
        </MobileView>
      </ProjectListContainer>
    </Section>
  );
};

export default ProjectsSection; 