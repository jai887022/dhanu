import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ArrowLeft, ArrowRight, ArrowRightCircle } from 'lucide-react';

interface PortfolioViewProps {
  projects: Project[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setCurrentView: (view: string) => void;
}

export default function PortfolioView({
  projects,
  activeIndex,
  setActiveIndex,
  setCurrentView
}: PortfolioViewProps) {
  const project = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
  };

  // Variants for elegant text swap
  const textContainerVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -12,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  };

  const imageVariants = {
    initial: { scale: 1.05, opacity: 0, x: 20 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      scale: 0.98, 
      opacity: 0, 
      x: -10,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  };

  return (
    <main className="flex-grow flex items-center px-6 sm:px-16 py-12 md:py-20 overflow-y-auto max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-12 gap-8 md:gap-16 w-full items-center">
        
        {/* Left Side: Editorial Context */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textContainerVariants}
              className="w-full"
            >
              {/* Category Pill */}
              <div className="mb-6 inline-block bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm select-none">
                {project.subtitle}
              </div>

              {/* Giant Title */}
              <h1 className="text-[55px] sm:text-[90px] md:text-[110px] leading-[0.85] font-light tracking-tighter mb-8 sm:mb-10 text-[#111111] select-all">
                {project.lightTitle}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-black/50 max-w-lg leading-relaxed font-light mb-8 sm:mb-12">
                {project.description}
              </p>

              {/* Client, Service, Year Metadata */}
              <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-black/5 pt-8 mb-8 sm:mb-12">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#111111]/40 mb-1">Client</div>
                  <div className="text-xs sm:text-sm font-semibold italic text-[#111111]">{project.client}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#111111]/40 mb-1">Service</div>
                  <div className="text-xs sm:text-sm font-semibold italic text-[#111111]">{project.service}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#111111]/40 mb-1">Year</div>
                  <div className="text-xs sm:text-sm font-semibold italic text-[#111111]">{project.year}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Navigation Control keys */}
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#111111] select-none">
            <button
              id="portfolio-btn-prev"
              onClick={handlePrev}
              className="flex items-center gap-2 hover:opacity-100 opacity-60 transition-opacity cursor-pointer group py-2"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Prev
            </button>
            <div className="text-black/20 text-xs">/</div>
            <button
              id="portfolio-btn-next"
              onClick={handleNext}
              className="flex items-center gap-2 hover:opacity-100 opacity-60 transition-opacity cursor-pointer group py-2"
            >
              Next
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex-grow" />

            <button
              id="portfolio-btn-inquire"
              onClick={() => setCurrentView('contact')}
              className="hidden sm:flex items-center gap-1 hover:opacity-80 transition-opacity text-xs border-b border-black text-black cursor-pointer "
            >
              Inquire About Space <ArrowRight className="w-3.5 h-3.5 inline" />
            </button>
          </div>
        </div>

        {/* Right Side: Aspect Portrait Visualizer Canvas */}
        <div className="col-span-12 lg:col-span-5 relative flex justify-center mt-8 lg:mt-0">
          <div className="w-full max-w-[380px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                className="aspect-[3/4] bg-white border border-black/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden group rounded-sm"
              >
                {/* Fallback pattern representing structural layout lines */}
                <div className="absolute inset-0 bg-stone-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Real Image Render */}
                <img
                  src={project.imagePath}
                  alt={project.title}
                  onError={(e) => {
                    // Suppress broken images if any and apply clean gradient placeholder background instead
                    e.currentTarget.style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Aesthetic minimal diagonal crossing vectors */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                  <div className="w-full h-[1px] bg-black rotate-45"></div>
                  <div className="w-full h-[1px] bg-black -rotate-45"></div>
                </div>

                {/* Big decorative transparent number */}
                <div className="absolute bottom-6 left-6 text-black/15 text-6xl font-black select-none pointer-events-none font-mono">
                  {project.indexNum}
                </div>

                {/* Small indicator label */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-0.5 text-[8px] font-mono tracking-widest text-black/50 border border-black/5 rounded-xs select-none">
                  IMAGE REF: {project.id.toUpperCase()}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Solid accent offset box behind */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-[#E1DFDB] -z-10 shadow-sm rounded-sm"></div>
          </div>
        </div>

      </div>
    </main>
  );
}
