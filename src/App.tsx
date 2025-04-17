import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navigation from './components/Navigation';
import IntroSection from './components/IntroSection';
import ProjectsSection from './components/ProjectsSection';

const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #fffbf3;
    --text-color: #000000;
    --card-background: #e9e9e9;
  }

  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    height: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  margin-top: 60px;
  display: flex;
  flex: 1;
  padding: 2rem 4rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;

  @media (max-width: 1200px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        <MainContent>
          <IntroSection />
          <ProjectsSection />
        </MainContent>
      </AppContainer>
    </>
  );
};

export default App;