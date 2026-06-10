import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JournalEntry } from '../types';
import { initialJournalEntries } from '../data';
import { Notebook, Bookmark, AlignLeft, Send, Sparkles, Filter, Trash2 } from 'lucide-react';

export default function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // For inserting a new custom note
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Theory' | 'Materials' | 'Aesthetics' | 'General'>('General');
  const [newContent, setNewContent] = useState('');
  const [scratchpadOpen, setScratchpadOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vox-journal-entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse entries', e);
        setEntries(initialJournalEntries);
      }
    } else {
      setEntries(initialJournalEntries);
      localStorage.setItem('vox-journal-entries', JSON.stringify(initialJournalEntries));
    }
  }, []);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readsCount: Math.floor(Math.random() * 20) + 1
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('vox-journal-entries', JSON.stringify(updated));

    // Clear and close
    setNewTitle('');
    setNewContent('');
    setNewCategory('General');
    setScratchpadOpen(false);
  };

  const handleDeleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    if (!id.startsWith('journal-')) return; // Allow deletion of user entries only
    
    if (window.confirm('Do you wish to remove this custom journal entry?')) {
      const updated = entries.filter((ent) => ent.id !== id);
      setEntries(updated);
      localStorage.setItem('vox-journal-entries', JSON.stringify(updated));
    }
  };

  const handleReadPost = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    // Increment read count locally
    const updated = entries.map((ent) => {
      if (ent.id === entry.id) {
        return { ...ent, readsCount: ent.readsCount + 1 };
      }
      return ent;
    });
    setEntries(updated);
    localStorage.setItem('vox-journal-entries', JSON.stringify(updated));
  };

  const categories = ['All', 'Theory', 'Materials', 'Aesthetics', 'General'];

  const filteredEntries = activeCategory === 'All' 
    ? entries 
    : entries.filter((ent) => ent.category === activeCategory);

  return (
    <main className="flex-grow px-6 sm:px-16 py-12 md:py-20 overflow-y-auto max-w-5xl mx-auto w-full">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 font-bold block mb-2">STUDIO ARCHIVES</span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#111111] font-display">
            The Vox <span className="font-bold">Journal</span>
          </h2>
          <div className="w-12 h-[2px] bg-black mt-6"></div>
        </div>

        {/* Action Button - Toggle custom note */}
        <button
          id="btn-toggle-scratchpad"
          onClick={() => setScratchpadOpen(!scratchpadOpen)}
          className="bg-black text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-800 transition-all text-center rounded-xs select-none cursor-pointer"
        >
          {scratchpadOpen ? 'Cancel Note' : 'Draft New Note'}
        </button>
      </div>

      {/* Write New Note Expansion Form */}
      <AnimatePresence>
        {scratchpadOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <form onSubmit={handleCreateEntry} className="bg-white border border-black/10 p-6 sm:p-10 space-y-6 rounded-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#111111]/50 font-mono font-bold block">NEW CORRESPONDENCE DRAFT</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-black/60 font-bold block mb-1">Note Title</label>
                  <input
                    id="journal-input-title"
                    type="text"
                    required
                    maxLength={60}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Dimensions of Empty Patios"
                    className="w-full bg-stone-50 border border-black/10 px-4 py-2 text-xs text-black focus:outline-none focus:border-black rounded-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-black/60 font-bold block mb-1">Category Classification</label>
                  <select
                    id="journal-select-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-black/10 px-4 py-2 text-xs text-black focus:outline-none focus:border-black rounded-xs"
                  >
                    <option value="General">General Reflection</option>
                    <option value="Theory">Theory of Void</option>
                    <option value="Materials">Material Sourcing</option>
                    <option value="Aesthetics">Aesthetics & Light</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-black/60 font-bold block mb-1">Body Text</label>
                <textarea
                  id="journal-input-content"
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Record your architectural insight or material observations here..."
                  className="w-full bg-stone-50 border border-black/10 p-4 text-xs text-black focus:outline-none focus:border-black rounded-xs font-serif leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  id="journal-btn-submit-note"
                  type="submit"
                  className="bg-black text-white text-[10px] uppercase font-bold tracking-widest px-6 py-3 hover:bg-stone-800 transition-colors cursor-pointer rounded-xs"
                >
                  Publish Note to Archives
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-12 select-none">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              id={`filter-pill-${cat}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-mono border transition-all rounded-full cursor-pointer ${
                isActive 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-[#111111]/60 border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Journal entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="journal-posts-grid">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((ent, idx) => {
            const isUserCreated = ent.id.startsWith('journal-');
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                key={ent.id}
                onClick={() => handleReadPost(ent)}
                className="bg-white border border-black/5 p-8 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] cursor-pointer hover:border-black/15 transition-all group rounded-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">
                      {ent.date}
                    </span>
                    <span className="bg-stone-100 text-stone-600 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider rounded-xs">
                      {ent.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-[#111111] mb-4 group-hover:text-black/80 transition-colors">
                    {ent.title}
                  </h3>

                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 font-serif">
                    {ent.content}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-black/5 pt-6 mt-6 select-none">
                  <span className="text-[10px] uppercase tracking-widest text-black font-bold">
                    Read Article &rarr;
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[8px] font-mono text-stone-400">
                      Views: {ent.readsCount}
                    </span>
                    {isUserCreated && (
                      <button
                        id={`btn-delete-entry-${ent.id}`}
                        onClick={(e) => handleDeleteEntry(ent.id, e)}
                        className="p-1 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                        title="Delete Custom Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Read Entry Modal Overlay */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F5F5F5] border border-black/10 p-8 sm:p-12 md:p-16 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl rounded-sm"
              id="selected-journal-container"
            >
              {/* Close Button */}
              <button
                id="btn-close-reader"
                onClick={() => setSelectedEntry(null)}
                className="absolute top-6 right-6 p-2 text-black/40 hover:text-black transition-colors cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-black/5 pb-4 select-none">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#111111]/50 font-mono block">VOX JOURNAL ENTRY</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">{selectedEntry.date}</span>
                  </div>
                  <span className="bg-black text-white px-3 py-1 text-[8px] font-mono uppercase tracking-widest">
                    {selectedEntry.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-[#111111] tracking-tight font-display">
                  {selectedEntry.title}
                </h3>

                <p className="text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-wrap select-text first-letter:text-4xl first-letter:font-extrabold first-letter:float-left first-letter:mr-2">
                  {selectedEntry.content}
                </p>

                <div className="border-t border-black/5 pt-6 text-center select-none text-[9px] uppercase tracking-widest text-[#111111]/40 font-mono">
                  CORRESPONDENCE REF: JOURNAL_{selectedEntry.id.toUpperCase()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
