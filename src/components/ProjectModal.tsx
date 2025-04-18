import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

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
  opacity: 0;
`;

const Content = styled.div`
  position: relative;
  width: 95vw;
  height: 90vh;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  padding-right: 0.4rem;
  transform: scale(0.95);
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
  z-index: 2;
  opacity: 0;

  &:hover {
    background: #e0e0e0;
    transform: scale(1.05);
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 12px;
  z-index: 1;
`;

const LoadingIcon = styled.img`
  width: 60px;
  height: 60px;
  opacity: 0;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const ProjectFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: white;
  opacity: 0;
  position: relative;
  z-index: 0;
`;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectLink: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectLink }) => {
  const [isLoading, setIsLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const spinnerAnimation = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isOpen && overlayRef.current && contentRef.current && closeButtonRef.current && frameRef.current && iconRef.current) {
      setIsLoading(true);
      
      gsap.set([overlayRef.current, contentRef.current, closeButtonRef.current, frameRef.current], {
        display: 'flex'
      });

      // Create icon spinning animation
      spinnerAnimation.current = gsap.timeline({ repeat: -1 })
        .fromTo(iconRef.current,
          { opacity: 1, rotation: 0, scale: 1 },
          { 
            rotation: 360,
            scale: 1.1,
            duration: 1.5, 
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1
          }
        );

      const tl = gsap.timeline();
      
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.inOut" }
      )
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(closeButtonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "-=0.2"
      )
      .fromTo(iconRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "-=0.2"
      );
    }

    return () => {
      if (spinnerAnimation.current) {
        spinnerAnimation.current.kill();
      }
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    if (frameRef.current && iconRef.current) {
      setIsLoading(false);
      
      if (spinnerAnimation.current) {
        spinnerAnimation.current.kill();
      }

      const tl = gsap.timeline();
      
      tl.to(iconRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .fromTo(frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.inOut" },
        "-=0.1"
      );
    }
  };

  const handleClose = () => {
    if (overlayRef.current && contentRef.current && closeButtonRef.current && frameRef.current) {
      if (spinnerAnimation.current) {
        spinnerAnimation.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onClose();
          setIsLoading(true);
        }
      });

      tl.to([frameRef.current, closeButtonRef.current, iconRef.current],
        { opacity: 0, duration: 0.2 }
      )
      .to(contentRef.current,
        { opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: "power2.inOut" },
        "-=0.1"
      )
      .to(overlayRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.inOut" },
        "-=0.2"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay ref={overlayRef} onClick={handleClose}>
      <Content ref={contentRef} onClick={e => e.stopPropagation()}>
        <CloseButton ref={closeButtonRef} onClick={handleClose}>×</CloseButton>
        <LoadingContainer style={{ display: isLoading ? 'flex' : 'none' }}>
          <LoadingIcon 
            ref={iconRef} 
            src="/images/pradyumnicon.png" 
            alt="Loading..."
          />
        </LoadingContainer>
        <ProjectFrame
          ref={frameRef}
          src={projectLink}
          title="Project"
          allow="fullscreen"
          onLoad={handleIframeLoad}
        />
      </Content>
    </Overlay>
  );
};

export default ProjectModal; 