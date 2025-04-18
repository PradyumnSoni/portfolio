import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import ResumeModal from './ResumeModal';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

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
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Logo = styled.span`
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fffbf3;
    top: 60px;
    left: 0;
    right: 0;
    padding: 2rem 1rem;
    gap: 1.5rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: all 0.3s ease-in-out;
    pointer-events: ${props => props.isOpen ? 'all' : 'none'};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
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

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
  }
`;

const IconLink = styled.a`
  text-decoration: none;
  color:rgb(0, 0, 0);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color:rgb(71, 71, 71);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileIconLink = styled(IconLink)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const SocialLinks = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
    margin-top: 0.5rem;
    justify-content: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #000000;

  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
  }
`;

const Navigation: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const spinAnimation = useRef<gsap.core.Timeline | null>(null);
  const confettiAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        gsap.fromTo(navRef.current, 
          { y: -60, opacity: 0 },
          { 
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }
        );
      }

      // Start the continuous spin animation
      if (iconRef.current) {
        spinAnimation.current = gsap.timeline({ repeat: -1 })
          .fromTo(iconRef.current,
            { rotation: 0 },
            { 
              rotation: 360,
              duration: 10,
              ease: "none"
            }
          );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (spinAnimation.current) {
        spinAnimation.current.kill();
      }
      // Clean up any ongoing confetti animation
      if (confettiAnimationRef.current) {
        cancelAnimationFrame(confettiAnimationRef.current);
      }
    };
  }, []);

  const handleIconClick = () => {
    if (spinAnimation.current) {
      spinAnimation.current.timeScale(10); // Speed up the spinning animation
    }

    // Brand colors - using the exact Title component color
    const colors = ['#ff3000', '#ffffff'];
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    // Cancel any existing animation
    if (confettiAnimationRef.current) {
      cancelAnimationFrame(confettiAnimationRef.current);
    }

    (function frame() {
      // Launch confetti from the left edge
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        ticks: 200,
        shapes: ['square']
      });

      // Launch confetti from the right edge
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        ticks: 200,
        shapes: ['square']
      });

      // Keep going until we are out of time
      if (Date.now() < end) {
        confettiAnimationRef.current = requestAnimationFrame(frame);
      } else {
        // Reset spin speed after animation
        if (spinAnimation.current) {
          spinAnimation.current.timeScale(1);
        }
      }
    }());
  };

  const handleResumeClick = () => {
    if (window.innerWidth <= 768) {
      // Open resume in new tab for mobile
      window.open('https://drive.google.com/file/d/1vgN_BxSvS5vv9QBzaa-M16P39bk3JNxP/view?usp=sharing', '_blank');
    } else {
      setIsResumeOpen(true);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Nav ref={navRef} style={{ opacity: 0 }}>
        <NavLeft>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'pointer'
            }}
            onClick={handleIconClick}
            onMouseEnter={() => {
              if (spinAnimation.current) {
                gsap.to(iconRef.current, {
                  duration: 0.3,
                  scale: 1.1,
                  ease: "power2.out"
                });
              }
            }}
            onMouseLeave={() => {
              if (spinAnimation.current) {
                gsap.to(iconRef.current, {
                  duration: 0.3,
                  scale: 1,
                  ease: "power2.out"
                });
              }
            }}
          >
            <ProfileIcon 
              ref={iconRef} 
              src="/images/pradyumnicon.png" 
              alt="Pradyumn's profile icon"
            />
            <Logo>Prady's Portfolio</Logo>
          </div>
          <MainNav>
            <NavLink to="/work">Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavButton onClick={handleResumeClick}>
              Resume
            </NavButton>
          </MainNav>
        </NavLeft>
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <MobileNav>
            <NavLink to="/work" onClick={() => setIsMenuOpen(false)}>Work</NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavButton onClick={handleResumeClick}>
              Resume
            </NavButton>
          </MobileNav>
          <NavRight>
            <IconLink href="mailto:pradyumn.ag@gmail.com" target="_blank" rel="noopener noreferrer">
              <HiOutlineMail />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/pradyumnag/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </IconLink>
            <SocialLinks>
              <MobileIconLink href="mailto:pradyumn.ag@gmail.com" target="_blank" rel="noopener noreferrer">
                <HiOutlineMail />
              </MobileIconLink>
              <MobileIconLink href="https://www.linkedin.com/in/pradyumnag/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </MobileIconLink>
            </SocialLinks>
          </NavRight>
        </NavLinks>
      </Nav>
      {!(window.innerWidth <= 768) && <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
    </>
  );
};

export default Navigation; 