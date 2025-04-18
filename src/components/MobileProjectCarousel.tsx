import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';

const CarouselContainer = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: -1rem;
  margin-right: -1rem;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 1rem;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CardWrapper = styled.div`
  min-width: 300px;
  width: calc(100vw - 2rem);
  scroll-snap-align: center;
  height: 30vh;
  margin-bottom: 3rem;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ff3000' : 'rgba(0, 0, 0, 0.2)'};
  transition: background-color 0.3s ease;
`;

const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${props => props.$active ? 'auto' : 'none'};
`;

interface MobileProjectCarouselProps {
  projects: Array<{
    title: string;
    year: string;
    description: string;
    image: string;
    link: string;
  }>;
  onProjectSelect: (link: string, title: string) => void;
}

const MobileProjectCarousel: React.FC<MobileProjectCarouselProps> = ({ projects, onProjectSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (trackRef.current) {
        const scrollLeft = trackRef.current.scrollLeft;
        const cardWidth = trackRef.current.offsetWidth * 0.8; // 80vw
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const trackElement = trackRef.current;
    if (trackElement) {
      trackElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (trackElement) {
        trackElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <CarouselContainer>
      <CarouselTrack ref={trackRef}>
        {projects.map((project, index) => (
          <CardWrapper key={index}>
            <ProjectCard
              title={project.title}
              year={project.year}
              description={project.description}
              image={project.image}
              link={project.link}
              onClick={() => onProjectSelect(project.link, project.title)}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </CardWrapper>
        ))}
      </CarouselTrack>
      <DotsContainer>
        {projects.map((_, index) => (
          <Dot key={index} active={index === activeIndex} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default MobileProjectCarousel; 