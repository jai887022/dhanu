import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioView from './components/PortfolioView';
import ExhibitionsView from './components/ExhibitionsView';
import StudioView from './components/StudioView';
import JournalView from './components/JournalView';
import ContactForm from './components/ContactForm';
import { initialProjects, initialExhibitions } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('portfolio');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  // Render active view dynamically
  const renderActiveView = () => {
    switch (currentView) {
      case 'portfolio':
        return (
          <PortfolioView
            projects={initialProjects}
            activeIndex={activeProjectIndex}
            setActiveIndex={setActiveProjectIndex}
            setCurrentView={setCurrentView}
          />
        );
      case 'exhibitions':
        return <ExhibitionsView exhibitions={initialExhibitions} />;
      case 'studio':
        return <StudioView />;
      case 'journal':
        return <JournalView />;
      case 'contact':
        return <ContactForm />;
      default:
        return (
          <PortfolioView
            projects={initialProjects}
            activeIndex={activeProjectIndex}
            setActiveIndex={setActiveProjectIndex}
            setCurrentView={setCurrentView}
          />
        );
    }
  };

  // Switch animation variants
  const viewVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="bg-[#F5F5F5] text-[#111111] min-h-screen flex flex-col font-sans selection:bg-black selection:text-white overflow-x-hidden antialiased">
      {/* Dynamic Header */}
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      {/* Primary Intersect View Grid with spring-fade transition */}
      <div className="flex-grow flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={viewVariants}
            className="flex-grow flex flex-col"
            id={`view-container-${currentView}`}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Footer */}
      <Footer 
        projects={initialProjects} 
        activeProjectIndex={activeProjectIndex} 
        setActiveProjectIndex={setActiveProjectIndex}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}
