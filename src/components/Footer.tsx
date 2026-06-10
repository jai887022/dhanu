import React from 'react';
import { Project } from '../types';

interface FooterProps {
  projects: Project[];
  activeProjectIndex: number;
  setActiveProjectIndex: (index: number) => void;
  setCurrentView: (view: string) => void;
}

export default function Footer({
  projects,
  activeProjectIndex,
  setActiveProjectIndex,
  setCurrentView
}: FooterProps) {
  return (
    <footer className="px-6 sm:px-16 h-24 flex flex-col sm:flex-row justify-between items-center border-t border-black/5 text-black/40 text-[10px] uppercase tracking-widest gap-4 sm:gap-0 bg-[#F5F5F5]/90">
      <div>
        &copy; {new Date().getFullYear()} Vox Creative Studio — Based in Copenhagen
      </div>
      
      <div className="flex space-x-8 items-center">
        {/* Colorful Project indicators */}
        <div className="flex -space-x-1" id="footer-project-dots">
          {projects.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                id={`footer-dot-${idx}`}
                key={proj.id}
                onClick={() => {
                  setCurrentView('portfolio');
                  setActiveProjectIndex(idx);
                }}
                className={`w-4 h-4 rounded-full border border-black/10 cursor-pointer transition-all duration-300 ${
                  isActive ? 'bg-black scale-115 z-10' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                title={proj.title}
                referrerPolicy="no-referrer"
              />
            );
          })}
        </div>

        <button
          id="btn-footer-view-all"
          onClick={() => {
            setCurrentView('portfolio');
          }}
          className="text-[10px] uppercase tracking-widest font-bold text-black border-b border-transparent hover:border-black transition-all cursor-pointer"
        >
          View All Projects
        </button>
      </div>
    </footer>
  );
}
