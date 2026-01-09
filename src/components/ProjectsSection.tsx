import React, { useEffect, useRef } from 'react';
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
    title: 'Dispatch Delivery Partner App',
    description: 'Mobile app for AI powered hyperlocal delivery',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-Dispatch.jpg`,
    link: '',
    type: 'Pre-Launch',
    id: 'dispatch'
  },
  {
    title: 'Food For Thought',
    description: 'Interactive Dining Experience using AR',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-FoodForThought.jpg`,
    link: 'https://pradyumn-projects.framer.website/foodforthought',
    type: 'Physical UX'
  },
  {
    title: 'DigiYatra',
    description: 'Redesigned for frequent-flyers\'s travel experience',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-Digiyatra.jpg`,
    link: 'https://pradyumn-projects.framer.website/digiyatra',
    type: 'Digital UX'
  },
  {
    title: 'SoulInk',
    description: 'An AI-powered kindle-like pad for new writers to explore new forms of writing',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-Soulink.jpg`,
    link: 'https://pradyumn-projects.framer.website/soulink',
    type: 'Phygital UX'
  },
  {
    title: 'Roots Minigardens',
    description: 'Logo Design for a terrarium brand',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-Roots.jpg`,
    link: 'https://pradyumn-projects.framer.website/rootsminigardens',
    type: 'Brand Identity'
  },
  {
    title: 'Louis Vuitton x Friday',
    description: 'Retelling Legacy by reviving the Heeled Boots for men',
    image: `${process.env.PUBLIC_URL}/images/projects/Project-LouisVuitton.jpg`,
    link: 'https://pradyumn-projects.framer.website/LVxFriday',
    type: 'Industrial Design'
  }
];

interface ProjectsSectionProps {
  onProjectSelect: (link: string, projectId?: string) => void;
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

  const handleProjectClick = (link: string, title: string, projectId?: string) => {
    // Allow opening modal for Dispatch project even without link
    if (projectId === 'dispatch') {
      onProjectSelect(link || '', projectId);
      return;
    }
    
    // Don't do anything if there's no link (coming soon projects)
    if (!link || link.trim() === '') {
      return;
    }
    
    if (window.innerWidth <= 768) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      onProjectSelect(link, projectId);
    }
  };

  return (
    <Section ref={sectionRef} style={{ opacity: 0 }}>
      <SectionTitle ref={titleRef}>Projects</SectionTitle>
      <ProjectListContainer>
        <DesktopProjectList ref={listRef}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              type={project.type}
              onClick={() => handleProjectClick(project.link, project.title, project.id)}
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