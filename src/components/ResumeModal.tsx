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
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f0f0f0;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    transform: scale(1.05);
  }
`;

const Split = styled.div`
  display: flex;
  height: 100%;
  gap: 2rem;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
`;

const Right = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  background-color: #e9e9e9;
  color: #000000;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: #ddd;
  }
`;

const ResumeFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: #e9e9e9;
`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Split>
          <Left>
            <ResumeFrame
              src="/images/Pradyumn-CV-March-2025.pdf"
              title="Resume"
            />
          </Left>
          <Right>
            <Actions>
              <ActionButton 
                href="/images/Pradyumn-CV-March-2025.pdf" 
                download
              >
                Download PDF
              </ActionButton>
              <ActionButton 
                href="mailto:pradyumnsoni@gmail.com"
              >
                Email Pradyumn
              </ActionButton>
              <ActionButton 
                href="https://linkedin.com/in/pradyumnsoni"
                target="_blank"
                rel="noopener noreferrer"
              >
                My LinkedIn
              </ActionButton>
            </Actions>
          </Right>
        </Split>
      </Content>
    </Overlay>
  );
};

export default ResumeModal; 