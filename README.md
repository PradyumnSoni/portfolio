# Prady's Portfolio

A modern, responsive portfolio website built with React and TypeScript.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Project Showcase**: Interactive project cards with detailed modals
- **Smooth Navigation**: Animated navigation with mobile-friendly menu
- **Performance Optimized**: Built with modern React practices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components
- **Animations**: GSAP (GreenSock)
- **Icons**: React Icons
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── IntroSection.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectModal.tsx
│   ├── ProjectsSection.tsx
│   └── MobileProjectCarousel.tsx
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Customization

- Update project information in the components
- Modify styling in styled-components
- Add new sections as needed
- Customize animations and interactions

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `build/` folder, ready for deployment to any static hosting service.

## License

This project is open source and available under the [MIT License](LICENSE).
