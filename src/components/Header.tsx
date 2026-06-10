import React from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Header({ currentView, setCurrentView }: HeaderProps) {
  const navItems = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'exhibitions', label: 'Exhibitions' },
    { id: 'studio', label: 'Studio' },
    { id: 'journal', label: 'Journal' }
  ];

  return (
    <header className="flex justify-between items-center px-6 sm:px-16 h-24 border-b border-black/5 bg-[#F5F5F5]/80 backdrop-blur-md sticky top-0 z-50">
      {/* Brand ID */}
      <button 
        id="btn-brand-logo"
        onClick={() => setCurrentView('portfolio')}
        className="text-xl font-black tracking-tighter italic cursor-pointer select-none hover:opacity-85 transition-opacity text-[#111111]"
      >
        VOX.
      </button>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-black/60">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative py-1 cursor-pointer transition-colors hover:text-black uppercase tracking-[0.2em] font-semibold ${
                isActive ? 'text-black' : 'text-black/60'
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Contact Button */}
      <div>
        <button
          id="btn-header-contact"
          onClick={() => setCurrentView('contact')}
          className={`border border-black px-6 py-2 text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ${
            currentView === 'contact' ? 'bg-black text-white' : 'bg-transparent text-black'
          }`}
        >
          Contact
        </button>
      </div>
    </header>
  );
}
