import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Section = styled.section`
  flex: 1;
  max-width: 720px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1 rem;
  font-weight: 400;
  color:rgb(128, 128, 128);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectListContainer = styled.div`
  width: 100%;
  max-width: 480px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectClick = (link: string, title: string) => {
    if (title === 'Urban Piper') {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedProject(link);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <Section>
      <SectionTitle>My Work</SectionTitle>
      <ProjectListContainer>
        <ProjectList>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              year={project.year}
              description={project.description}
              image={project.image}
              link={project.link}
              onClick={() => handleProjectClick(project.link, project.title)}
            />
          ))}
        </ProjectList>
      </ProjectListContainer>
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        projectLink={selectedProject || ''}
      />
    </Section>
  );
};

export default ProjectsSection; 