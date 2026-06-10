import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, HelpCircle, Activity, Globe, Compass, Eye, ShieldAlert } from 'lucide-react';

export default function StudioView() {
  const [activePrinciples, setActivePrinciples] = useState<string[]>(['material-truth']);

  const togglePrinciple = (id: string) => {
    if (activePrinciples.includes(id)) {
      setActivePrinciples(activePrinciples.filter(x => x !== id));
    } else {
      setActivePrinciples([...activePrinciples, id]);
    }
  };

  const principles = [
    {
      id: 'material-truth',
      title: 'Material Truth',
      short: 'Honoring natural surface textures',
      desc: 'We refuse veneers or paint coats where pure substrate can stand. Concrete must look like baked lime; basalt must reflect volcanic memory; wood must breathe grain and fiber. If a surface has a structural job, it must reveal its authentic nature.'
    },
    {
      id: 'structural-void',
      title: 'The Active Void',
      short: 'Spaces defined by what has been left',
      desc: 'We treat empty air as a primary architectural material. By pushing structures to boundaries or making them incredibly slender, we allow sunlight, shadow, and wind to occupy the core. Design is the framing of empty space.'
    },
    {
      id: 'acoustic-quiet',
      title: 'Acoustic Silence',
      short: 'Curing architectural sonic vibration',
      desc: 'Minimalism, to us, is not just visual; it is physical and sensory. We design with sound-absorbing micro-grooved wood slates, thick acoustic clay plasters, and solid concrete anchors to create sensory decompression chambers from urban noise.'
    }
  ];

  return (
    <main className="flex-grow px-6 sm:px-16 py-12 md:py-20 overflow-y-auto max-w-5xl mx-auto w-full">
      {/* Title block */}
      <div className="mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 font-bold block mb-2">ABOUT THE TEAM</span>
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#111111] font-display">
          VOX. Studio <span className="font-bold">Manifesto</span>
        </h2>
        <div className="w-12 h-[2px] bg-black mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left column: Manifesto & Metrics */}
        <div className="md:col-span-12 lg:col-span-7 space-y-12">
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-[#111111] max-w-xl">
            We are a spatial curation and architecture atelier operating across Copenhagen, Stockholm, and Helsinki. Since 2018, we have removed the unnecessary to reveal the permanent.
          </p>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 border-y border-black/5 py-8">
            <div>
              <div className="text-3xl font-black font-display tracking-tight text-[#111111]">03</div>
              <div className="text-[9px] uppercase tracking-widest text-[#111111]/55 mt-1 font-mono">Nordic Hubs</div>
            </div>
            <div>
              <div className="text-3xl font-black font-display tracking-tight text-[#111111]">14</div>
              <div className="text-[9px] uppercase tracking-widest text-[#111111]/55 mt-1 font-mono">Curated Studies</div>
            </div>
            <div>
              <div className="text-3xl font-black font-display tracking-tight text-[#111111]">07</div>
              <div className="text-[9px] uppercase tracking-widest text-[#111111]/55 mt-1 font-mono">Exhibitions</div>
            </div>
          </div>

          {/* Core Philosophy Accordions */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-black/40 mb-6 font-mono">Core Disciplines</h3>
            
            {principles.map((pr) => {
              const isOpen = activePrinciples.includes(pr.id);
              return (
                <div key={pr.id} className="border border-black/5 bg-white p-6 rounded-xs hover:border-black/15 transition-all">
                  <button
                    id={`manifesto-toggle-${pr.id}`}
                    onClick={() => togglePrinciple(pr.id)}
                    className="w-full flex justify-between items-center text-left cursor-pointer select-none"
                  >
                    <div>
                      <h4 className="text-base font-bold text-black tracking-tight">{pr.title}</h4>
                      <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase mt-0.5">{pr.short}</p>
                    </div>
                    <span className="text-xl font-light text-stone-400">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-sm text-[#111111]/70 leading-relaxed font-light border-t border-black/5 pt-4">
                        {pr.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Graphic Representation */}
        <div className="md:col-span-12 lg:col-span-5 space-y-8">
          <div className="bg-white border border-black/10 p-8 space-y-6 shadow-md rounded-sm">
            <div className="flex justify-between items-start border-b border-black/5 pb-4">
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-widest">Studio Address</h4>
                <p className="text-xs text-stone-500 italic mt-0.5">Sjællandsgade 128, Copenhagen</p>
              </div>
              <Globe className="w-4 h-4 text-black" />
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#111111]/70 leading-relaxed font-light">
                Our main studio is a restored 1920s brick water reservoir. The space features 7-meter high exposed walls and a central concrete skylight that serves as our lighting diagnostics chamber.
              </p>
              
              <p className="text-xs text-[#111111]/70 leading-relaxed font-light mb-4">
                We welcome structural engineers, spatial curators, and material suppliers by prior appointment.
              </p>

              <div className="bg-stone-50 border border-black/5 p-4 rounded-sm text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#111111]/50 font-mono block">Status Indicator</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 animate-pulse mt-1 inline-flex items-center gap-1">
                  ● ACTIVE DEV STUDIO — OPEN FOR INQUIRIES
                </span>
              </div>
            </div>
          </div>

          <div className="aspect-square bg-stone-200 border border-black/5 relative overflow-hidden group select-none">
            {/* Visual Abstract Curation layout */}
            <div className="absolute inset-0 bg-stone-300"></div>
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#F5F5F5]/30"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#F5F5F5]/30"></div>
            <div className="absolute inset-8 rounded-full border border-black/5 flex items-center justify-center">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#111111]/30 font-mono">AXIS ROTATION</span>
            </div>
            <div className="absolute bottom-6 right-6 text-2xl font-black text-white">VOX.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
