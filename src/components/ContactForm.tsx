import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';
import { Check, ClipboardList, Send, Mail, Trash2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Acquisitions');
  const [message, setMessage] = useState('');
  
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vox-messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: `[Subject: ${topic}] ${message.trim()}`,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      }) + ' ' + new Date().toLocaleDateString('en-US')
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('vox-messages', JSON.stringify(updated));

    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Do you wish to remove your sent correspondence log entry?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('vox-messages', JSON.stringify(updated));
    }
  };

  return (
    <main className="flex-grow px-6 sm:px-16 py-12 md:py-20 overflow-y-auto max-w-5xl mx-auto w-full">
      {/* Title block */}
      <div className="mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 font-bold block mb-2">CORRESPONDENCE PORTAL</span>
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#111111] font-display">
          Begin <span className="font-bold">Inquiry</span>
        </h2>
        <div className="w-12 h-[2px] bg-black mt-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left column: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-black/10 p-8 sm:p-12 relative shadow-md rounded-sm">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#111111]/45 font-mono font-bold block">COMMUNICATION DESK</span>
                <p className="text-xs text-stone-500 mt-2">
                  Our correspondence is quiet but deliberate. Fill out the fields below and our curation lead will return a response.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-black/70 font-bold block mb-1">
                      Your Name
                    </label>
                    <input
                      id="contact-input-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Saskia Vander"
                      className="w-full bg-stone-50 border border-black/10 px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-black/70 font-bold block mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-input-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. saskia@ateliers.no"
                      className="w-full bg-stone-50 border border-black/10 px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-black/70 font-bold block mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-select-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-stone-50 border border-black/10 px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black rounded-xs cursor-pointer"
                  >
                    <option value="Acquisitions">Spatial Acquisitions & Commissions</option>
                    <option value="Press">Press & Curations</option>
                    <option value="Collaboration">Atelier Collaborations</option>
                    <option value="General">General Correspondence</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-black/70 font-bold block mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="contact-input-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the architectural scope, site timeline, or curation purpose..."
                    className="w-full bg-stone-50 border border-black/10 p-4 text-xs text-black focus:outline-none focus:border-black rounded-xs font-serif leading-relaxed"
                  />
                </div>
              </div>

              <button
                id="contact-btn-submit"
                type="submit"
                className="w-full bg-black text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3.5 hover:bg-stone-800 transition-colors cursor-pointer rounded-xs"
              >
                Transmit Message &rarr;
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-black text-[#F5F5F5] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-light text-black font-display tracking-tight">Transmission Received</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Your spatial curation inquiry has been logged in our active system. We review transmissions on Monday mornings in Copenhagen. You will receive a post shortly.
                </p>
              </div>
              <div className="text-[8px] font-mono text-stone-400">
                TRANS-ID: VOX_{Math.floor(Math.random() * 90000) + 10000}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right column: Info & Messages Log */}
        <div className="lg:col-span-5 space-y-8">
          {/* Active Contacts Card */}
          <div className="bg-stone-100 border border-black/5 p-6 space-y-4 rounded-sm">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-black border-b border-black/5 pb-2">Direct Contact Channels</h4>
            <div className="text-xs space-y-3 font-light text-stone-600">
              <div>
                <span className="font-semibold text-black italic">Email Correspondence:</span>
                <p className="font-mono mt-0.5 text-[#111111]/80">direct@vox.creative.studio</p>
              </div>
              <div>
                <span className="font-semibold text-black italic">Atelier Post Box:</span>
                <p className="mt-0.5">Sjællandsgade 128, Floor G,<br />2100 Copenhagen Ø, Denmark</p>
              </div>
            </div>
          </div>

          {/* Received Log */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-black/50 uppercase tracking-widest font-semibold border-b border-black/5 pb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Outbox Transmission Log ({messages.length})</span>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-400 italic bg-white border border-black/5 rounded-xs p-4">
                No active outgoing messages recorded on this terminal.
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white border border-black/5 p-4 rounded-xs shadow-xs relative group">
                    <button
                      id={`btn-delete-msg-${msg.id}`}
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Clear Transmission record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-[9px] font-mono text-stone-400">{msg.timestamp}</div>
                    <div className="text-[11px] font-bold text-black mt-1">To: Vox Studio</div>
                    <div className="text-xs text-stone-500 italic mt-0.5">Sent by {msg.name} ({msg.email})</div>
                    <p className="text-xs text-[#111111]/80 leading-relaxed font-sans mt-2 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
