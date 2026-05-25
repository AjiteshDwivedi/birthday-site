import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Code, Gamepad2, Gift } from 'lucide-react';
import FallingStars from './components/FallingStars';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import MemoryCardGrid from './components/MemoryCardGrid';
import BirthdayCake from './components/BirthdayCake';
import ScrapbookGallery from './components/ScrapbookGallery';
import Modals from './components/Modals';
import { FRIENDS_NAME, FRIENDS_NICKNAME } from './data';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setActiveModal(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div id="website-root-container" className="relative min-h-[101vh] bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* 1. Starry Celestial Floating Canvas */}
      <FallingStars />

      {/* 2. Cozy Spotify Ambient Controls Floating Node */}
      <MusicPlayer />

      {/* Main Page Layout Flow */}
      <div className="relative z-10">
        
        {/* 3. Narrative Landing Block Hero */}
        <Header />

        {/* Separator Accent */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        {/* 4. Interactive Capsule Memories Grid Section */}
        <MemoryCardGrid onCardClick={handleOpenModal} />

        {/* Separator Accent */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* 5. Scrapbook Table & Checklist Board Section */}
        <ScrapbookGallery />

        {/* Separator Accent */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        {/* 6. Blow Cake Interactive Experiment Section */}
        <BirthdayCake />

        {/* Separator Accent */}
        <div className="max-w-7xl mx-auto px-6 my-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* 7. Symmetrical Glowing Emotional Ending Scene */}
        <footer id="emotional-conclusion-scene" className="relative py-24 px-6 text-center select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300"
            >
              <Gift className="w-5 h-5 animate-pulse" />
            </motion.div>

            <div className="flex flex-col gap-1">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
                Happy 17th, {FRIENDS_NICKNAME}.
              </h2>
              <p className="text-sm font-mono text-purple-400 tracking-widest mt-1 uppercase">
                Thanks for the absolute chaos.
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light font-sans max-w-sm">
              We started our friendship arguing over Roblox lobby blocks and grew into the ultimate late-night typing duo. Thanks for being the coolest unhinged yapper. Hope your 17th is magnificent.
            </p>

            <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest border-t border-white/5 pt-4 w-full justify-between">
              <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> SECURE HANDSHAKES</span>
              <span className="flex items-center gap-1">ESTABLISHED 2021 <Heart className="w-3 h-3 text-purple-400 fill-purple-400/20" /></span>
            </div>
          </div>
        </footer>

      </div>

      {/* 8. Global Glassmorphism Popups Overlay system */}
      <Modals 
        isOpen={activeModal !== null} 
        onClose={handleCloseModal} 
        type={activeModal || ''} 
      />
    </div>
  );
}
