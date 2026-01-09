import React, { useState } from 'react';
import styled from 'styled-components';
import { SiGoogleplay } from 'react-icons/si';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    gap: 2rem;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AppIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin-bottom: 0.5rem;
  object-fit: cover;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0;
  color: #000000;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666666;
  margin: 0;
  line-height: 1.6;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const Badge = styled.span`
  background-color: #f0f0f0;
  color: #333333;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PulsingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
  display: inline-block;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
`;

const VisualSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ScreenshotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ScreenshotWrapper = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  background-color: #e9e9e9;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 0.9rem;
  
  &::after {
    content: ${props => props.$hasImage ? 'none' : '"Screenshot"'};
    display: ${props => props.$hasImage ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Label = styled.p`
  font-size: 1rem;
  color: #888888;
  margin: 0;
  font-style: italic;
`;

const RoleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const RoleText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #333333;
  margin: 0;
  max-width: 800px;
`;

const PlayStoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #000000;
  color: #ffffff;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  width: fit-content;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;

const PlayIcon = styled(SiGoogleplay)`
  font-size: 1.2rem;
`;

const DispatchProjectContent: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <AppIcon 
          src="https://play-lh.googleusercontent.com/0-O1SkPwsIDzH7oriGNfoN225Vf2gaoGKkR8YyLHDHMJzJSEbqSw81kxO3cm9j69BcK9fLqqXqA5SD608FzZUA=w240-h480-rw"
          alt="Dispatch Rider App Icon"
        />
        <TitleRow>
          <Title>Dispatch Delivery Partner App</Title>
          <PlayStoreButton 
            href="https://play.google.com/store/apps/details?id=com.harshdispatch.dispatchrider.v2" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ whiteSpace: 'nowrap' }}
          >
            <PlayIcon />
            View app on Play Store
          </PlayStoreButton>
        </TitleRow>
        <Subtitle>Dispatch Rider App is a mobile application used by delivery riders to complete food and everyday-essentials deliveries within a city. Riders use the app to onboard, receive delivery tasks, navigate orders, and confirm completion. Incentives and lightweight gamified feedback help encourage consistent performance and reliability. The app is designed for real-world delivery work and daily operational use.</Subtitle>
        <BadgesContainer>
          <Badge>
            <PulsingDot />
            Live on Play Store
          </Badge>
          <Badge>Pre-launch build</Badge>
          <Badge>Full app launching soon</Badge>
        </BadgesContainer>
      </HeroSection>

      {/* Visual Section */}
      <VisualSection>
        <ScreenshotsGrid>
          <ScreenshotWrapper $hasImage={!imageErrors[1]}>
            <ScreenshotImage 
              src="https://play-lh.googleusercontent.com/Uk01GWNKVSpQRfUAEIZ_qDTpEx7g-VD-g_2bAaK3bPAr9TPy7cuA6qwxHz1se07xm3YW0L-hNdoIEuRmDJpnAQ=w2560-h1440-rw"
              alt="Dispatch app screenshot 1"
              onError={() => handleImageError(1)}
            />
          </ScreenshotWrapper>
          <ScreenshotWrapper $hasImage={!imageErrors[2]}>
            <ScreenshotImage 
              src="https://play-lh.googleusercontent.com/LzVnwzp_UqdLO2AjjCDgioiSUTXHf4vrsdh0WWOIL4MdgpI2eukl8M_wEAd7cEQuOcC9gmdk5c3SFWdSpIbRKg=w2560-h1440-rw"
              alt="Dispatch app screenshot 2"
              onError={() => handleImageError(2)}
            />
          </ScreenshotWrapper>
          <ScreenshotWrapper $hasImage={!imageErrors[3]}>
            <ScreenshotImage 
              src="https://play-lh.googleusercontent.com/LqdfzXF-Xzunro6P_6PWx0EqkeCK2Jvn7r1NjOVxnws7wow3Bbw9q4Pi3LnVWL2CSyqg9wS9Tr6jhsj5xtwsYR4=w2560-h1440-rw"
              alt="Dispatch app screenshot 3"
              onError={() => handleImageError(3)}
            />
          </ScreenshotWrapper>
          <ScreenshotWrapper $hasImage={!imageErrors[4]}>
            <ScreenshotImage 
              src="https://play-lh.googleusercontent.com/ApxkeKfjdMhgmLaKIwtS-TLbMh9W3La4eAsOjEl7UgZSzSaTOeepz79dANhqj7XLNU75Veq-wuS_xKvL6K7PYA=w2560-h1440-rw"
              alt="Dispatch app screenshot 4"
              onError={() => handleImageError(4)}
            />
          </ScreenshotWrapper>
        </ScreenshotsGrid>
        <Label>This is an early pilot version of the app, where the final UI has been masked to protect the privacy of the app.</Label>
      </VisualSection>

      {/* My Role Section */}
      <RoleSection>
        <Title>My role</Title>
        <RoleText>
          End-to-end ownership across research, product design, UI, development, brand, and launch - including on-ground rider research, flow and system design, mobile app development, Play Store release, analytics setup, and operational decision support.I greatly influenced engineering and ops decisions, identifying and implementing cost optimizations in third-party API usage.
        </RoleText>
      </RoleSection>
      <div>
          <PlayStoreButton 
            href="https://play.google.com/store/apps/details?id=com.harshdispatch.dispatchrider.v2" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <PlayIcon />
            See live app on the Play Store (early version)
          </PlayStoreButton>
        </div>
    </Container>
  );
};

export default DispatchProjectContent;
