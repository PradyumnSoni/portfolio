import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Content = styled.div`
  position: relative;
  width: 95vw;
  height: 90vh;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  padding-right: 0.4rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #f0f0f0;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: #e0e0e0;
    transform: scale(1.05);
  }
`;

const ProjectFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: white;
`;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectLink: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectLink }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ProjectFrame
          src={projectLink}
          title="Project"
          allow="fullscreen"
        />
      </Content>
    </Overlay>
  );
};

export default ProjectModal; 