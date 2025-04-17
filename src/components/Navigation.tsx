import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import ResumeModal from './ResumeModal';

const Nav = styled.nav`
  height: 60px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fffbf3;
  z-index: 1000;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.span`
  font-weight: 600;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const NavButton = styled.button`
  text-decoration: none;
  color: #000000;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconLink = styled.a`
  text-decoration: none;
  color: #4a4a4a;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #000000;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Navigation: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <Nav>
        <NavLeft>
          <Logo>Prady's Portfolio</Logo>
          <NavLinks>
            <NavLink to="/work">Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavButton onClick={() => setIsResumeOpen(true)}>Resume</NavButton>
          </NavLinks>
        </NavLeft>
        <NavRight>
          <IconLink href="mailto:pradyumnsoni@gmail.com" aria-label="Email">
            <HiOutlineMail />
          </IconLink>
          <IconLink href="https://linkedin.com/in/pradyumnsoni" aria-label="LinkedIn">
            <FaLinkedin />
          </IconLink>
        </NavRight>
      </Nav>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};

export default Navigation; 