import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Exhibition, RSVP } from '../types';
import { MapPin, Calendar, Clock, User, CheckCircle2, Ticket, X } from 'lucide-react';

interface ExhibitionsViewProps {
  exhibitions: Exhibition[];
}

export default function ExhibitionsView({ exhibitions }: ExhibitionsViewProps) {
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load RSVPs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vox-rsvps');
    if (saved) {
      try {
        setRsvps(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse RSVPs', e);
      }
    }
  }, []);

  // Check if user has RSVPed for an exhibition
  const hasRSVPed = (exhibitionId: string) => {
    return rsvps.some(r => r.exhibitionId === exhibitionId);
  };

  const handleOpenRSVP = (exh: Exhibition) => {
    setSelectedExhibition(exh);
    setIsSuccess(false);
    setName('');
    setEmail('');
  };

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExhibition || !name.trim() || !email.trim()) return;

    const newRsvp: RSVP = {
      id: `rsvp-${Date.now()}`,
      exhibitionId: selectedExhibition.id,
      name: name.trim(),
      email: email.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = [...rsvps, newRsvp];
    setRsvps(updated);
    localStorage.setItem('vox-rsvps', JSON.stringify(updated));
    setIsSuccess(true);

    // Auto-close modal after brief duration to show success feedback
    setTimeout(() => {
      setSelectedExhibition(null);
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <main className="flex-grow px-6 sm:px-16 py-12 md:py-20 overflow-y-auto max-w-5xl mx-auto w-full">
      {/* Title block */}
      <div className="mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 font-bold block mb-2">Exhibition Space</span>
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#111111] font-display">
          Retrospectives <span className="font-bold">&</span> Openings
        </h2>
        <div className="w-12 h-[2px] bg-black mt-6"></div>
      </div>

      <div className="space-y-16">
        {/* Upcoming Section */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-black/40 mb-8 border-b border-black/5 pb-2">
            Active & Upcoming Programs
          </h3>
          <div className="grid gap-12">
            {exhibitions
              .filter((exh) => exh.status === 'upcoming')
              .map((exh, idx) => {
                const confirmed = hasRSVPed(exh.id);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    key={exh.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-l-2 border-black/10 hover:border-black pl-6 transition-all py-2"
                  >
                    {/* Date/Location col */}
                    <div className="md:col-span-4 text-stone-500 text-xs font-mono space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-black" />
                        <span>{exh.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-black" />
                        <span className="italic">{exh.location}</span>
                      </div>
                    </div>

                    {/* Main content col */}
                    <div className="md:col-span-6 space-y-3">
                      <h4 className="text-xl font-bold tracking-tight text-[#111111]">
                        {exh.title}
                      </h4>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 font-semibold italic">
                        {exh.subtitle}
                      </p>
                      <p className="text-sm text-[#111111]/70 leading-relaxed font-light">
                        {exh.description}
                      </p>
                      <div className="text-[10px] text-stone-400 font-mono">
                        Curation: {exh.curator}
                      </div>
                    </div>

                    {/* Interactive RSVP col */}
                    <div className="md:col-span-2 flex md:justify-end">
                      {confirmed ? (
                        <div className="flex items-center gap-1.5 bg-black text-white py-2 px-4 text-[10px] font-bold uppercase tracking-widest rounded-xs select-none">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white animate-pulse" />
                          Confirmed
                        </div>
                      ) : (
                        <button
                          id={`rsvp-trigger-${exh.id}`}
                          onClick={() => handleOpenRSVP(exh)}
                          className="w-full md:w-auto border border-black px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                        >
                          RSVP Standard Badge
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Historic Section */}
        <div className="pt-8">
          <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-black/40 mb-8 border-b border-black/5 pb-2">
            Historic Archives
          </h3>
          <div className="grid gap-12 opacity-60">
            {exhibitions
              .filter((exh) => exh.status === 'completed')
              .map((exh, idx) => (
                <div
                  key={exh.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-l-2 border-stone-300 pl-6 py-2"
                >
                  <div className="md:col-span-4 text-stone-500 text-xs font-mono space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exh.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exh.location}</span>
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <h4 className="text-lg font-semibold tracking-tight text-[#111111]">
                      {exh.title} <span className="text-[9px] font-mono border border-black/25 text-black/80 uppercase px-1.5 ml-2">Archived</span>
                    </h4>
                    <p className="text-xs text-[#111111]/70 font-light">
                      {exh.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* RSVP Overlay Modal */}
      <AnimatePresence>
        {selectedExhibition && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F5F5F5] border border-black/10 p-8 sm:p-12 max-w-md w-full relative shadow-2xl rounded-sm"
              id="rsvp-modal-container"
            >
              {/* Close Button */}
              <button
                id="btn-close-rsvp"
                onClick={() => setSelectedExhibition(null)}
                className="absolute top-6 right-6 p-1 text-black/40 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <form onSubmit={handleSubmitRSVP} className="space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-black/40 font-mono">RETROSPECTIVE RSVP</span>
                    <h3 className="text-2xl font-light text-[#111111] tracking-tight mt-1 font-display">
                      {selectedExhibition.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-2">
                      Each opening features limited private entries. Please sign below to register your exclusive entry pass.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-[#111111] block mb-1 font-bold">
                        Full Name
                      </label>
                      <input
                        id="rsvp-input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-white border border-black/15 px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black rounded-xs font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-[#111111] block mb-1 font-bold">
                        Email Address
                      </label>
                      <input
                        id="rsvp-input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. eleanor@vance.studio"
                        className="w-full bg-white border border-black/15 px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black rounded-xs font-sans"
                      />
                    </div>
                  </div>

                  <button
                    id="rsvp-btn-submit"
                    type="submit"
                    className="w-full bg-black text-white text-[10px] uppercase tracking-[0.2em] py-3.5 font-bold hover:bg-stone-800 transition-colors cursor-pointer rounded-xs"
                  >
                    Confirm Private Seat
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-12 h-12 text-black animate-scale-up" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-black">
                    Reservation Captured
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                    Your seat for <span className="font-semibold">{selectedExhibition.title}</span> has been locked. A digital barcode and confirmation post will arrive shortly at <span className="italic block mt-1 font-mono text-black">{email}</span>.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
