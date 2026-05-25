import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Heart, CheckSquare, X, Info, HandMetal, AlertCircle } from 'lucide-react';
import { INSIDE_JOKES_CHECKLIST, FRIENDS_NICKNAME, CURSED_SCREENSHOTS } from '../data';

// Handwritten stories/quotes corresponding to the four keepers to maximize emotional warmth and nostalgic authenticity
const DETAILED_MEMORIES_STORIES: Record<string, { badge: string; sub: string; story: string; doodle: string }> = {
  "mem-face": {
    badge: "Nostalgic Presence",
    sub: "The face behind the 2AM text yaps",
    story: "We've spent literal years as flat cartoon avatars on Roblox and flickering green indicators in a Discord sidebar. Seeing your smiling self in real daylight is like finding a long-lost chapter. It instantly grounds all the jokes, the late-night homework escapes, and the unhinged typing into a real, irreplaceable human friendship. You've been a steady anchor through high-school chaos, and I hope your 17th year brings you as much genuine light and warmth as you've shared with me in our calls.",
    doodle: "✨ Your smile is officially pre-approved for +10,000 aura levels!"
  },
  "mem-bracelet": {
    badge: "Physical Keepsake",
    sub: "Our digital bond, materialized in thread",
    story: "Thats bracelet actually looks quite cute on you ngl. I wanted to include a physical token of our friendship that you could wear or keep with you as a reminder of our bond!",
    doodle: "💫 Forever linked by high ping, terrible lag, and matching stars."
  },
  "mem-toy": {
    badge: "The Late-night Witness",
    sub: "Silent spectator to our chaotic sessions",
    story: "These little toy ducks have actually look cute. It's witnessed the screaming over impossible jumps in Tower of Hell, the keyboard typing at Mach 5 speeds, and the long, entirely peaceful silence where neither of us spoke—just typing away in reassurance. It is our official gaming companion LMAOO 😭😭.",
    doodle: "🐾 Rated: 100% cozy, 0% helpful at solving Adopt Me trade scams."
  },
  "mem-flower": {
    badge: "Everyday Crown",
    sub: "The quiet holder of messy mornings",
    story: "That hair clutcher is basically part of your personality at this point. It’s seen the rushed school mornings, the lazy tie-up-don’t-care evenings, and those random moments when you just needed your hair out of your face to think clearly. It’s not flashy, but it does its job perfectly—holding everything together when things feel a bit all over the place. In a weird way, it feels like a small symbol of how you carry yourself too: simple, steady, and effortlessly present in every moment, even the chaotic ones.",
    doodle: "🌀 Holds chaos in place so you don’t have to."
  }
};

export default function ScrapbookGallery() {
  const [jokes, setJokes] = useState(INSIDE_JOKES_CHECKLIST);
  const [selectedMemory, setSelectedMemory] = useState<typeof CURSED_SCREENSHOTS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Toggle item in checklist to make it fully interactive!
  const handleToggleJoke = (id: string) => {
    setJokes(prev =>
      prev.map(joke =>
        joke.id === id ? { ...joke, unlocked: !joke.unlocked } : joke
      )
    );
  };

  return (
    <section id="scrapbook-gallery-section" className="max-w-7xl mx-auto py-24 sm:py-32 px-6 sm:px-8 font-sans">
      <div className="mb-14 sm:mb-16 text-center md:text-left select-none">
        <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-[0.18em] flex items-center justify-center md:justify-start gap-1.5 leading-none">
          <Sparkles className="w-4 h-4 text-cyan-300" /> Secure Memorabilia Cabinet
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mt-3 text-slate-100">
          The Polaroid Desk & Keepsake Ledger
        </h2>
        <p className="text-slate-350 text-sm sm:text-base mt-3.5 max-w-2xl leading-relaxed font-light">
          Pick up, stack, and drag around these carefully curated keepsakes on the digital table. Click on them to inspect their handwritten story capsules!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Inside Jokes Checklist: styled as a beautiful legal notebook wire pad */}
        <div id="milestones-scorecard-container" className="col-span-1 lg:col-span-5 rounded-3xl bg-slate-950/70 border border-purple-500/20 p-6 sm:p-9 backdrop-blur-xl relative select-none">
          <div className="absolute top-4 right-4 text-[9px] font-mono font-bold text-purple-400 border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Scorecard: ACTIVE
          </div>

          <h3 className="text-xl font-display font-medium text-slate-100 flex items-center gap-2 mt-1">
            <CheckSquare className="w-5 h-5 text-purple-400" /> Friendship Milestones
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-light">
            An updated log verifying our chief accomplishments. Click on squares to toggle/unmute new milestones manually!
          </p>

          <div className="mt-8 flex flex-col gap-3.5 max-h-[30rem] overflow-y-auto pr-1.5 custom-scrollbar">
            {jokes.map((j) => (
              <div
                key={j.id}
                onClick={() => handleToggleJoke(j.id)}
                className={`flex gap-4 p-4 rounded-xl border cursor-pointer hover:bg-slate-900/40 transition-all ${j.unlocked ? 'border-purple-500/30 bg-purple-500/5' : 'border-white/5 bg-transparent opacity-60 hover:opacity-90'}`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${j.unlocked ? 'bg-purple-500 border-purple-400 text-slate-950' : 'border-slate-700 bg-slate-900'}`}>
                  {j.unlocked && <span className="text-[10px] font-black">✓</span>}
                </div>
                <div>
                  <h4 className={`text-sm font-semibold leading-relaxed ${j.unlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                    {j.text}
                  </h4>
                  <span className="text-[10.5px] font-mono font-bold text-slate-500 block mt-1.5 uppercase tracking-wider">
                    CONTEXT: {j.context}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draggable Scrapbook Polaroid Table Canvas */}
        <div
          ref={containerRef}
          id="draggable-desk-board"
          className="col-span-1 lg:col-span-7 h-[36rem] sm:h-[42rem] w-full rounded-3xl bg-slate-950/45 border border-dashed border-white/10 relative overflow-hidden backdrop-blur-xl shadow-inner flex items-center justify-center text-center px-4"
        >
          {/* Subtle instructions watermark panel */}
          <div className="absolute pointer-events-none select-none z-0 flex flex-col items-center gap-2.5 max-w-sm text-center opacity-80">
            <div className="w-11 h-11 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-450 shadow-md">
              <AlertCircle className="w-5 h-5 animate-bounce text-purple-400" />
            </div>
            <h4 className="text-sm font-display font-medium text-slate-300">Cozy Interactive Polaroid Desk</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light mt-1">
              Drag drawings around with your mouse or finger! Hover to lift, click to unlock the handwritten story loop inside.
            </p>
          </div>

          {/* Render 4 Keepsake Polaroids */}
          {CURSED_SCREENSHOTS.map((sn, idx) => {
            // Distinct floating loops to make sure coordinates float asymmetrically
            const floatDuration = 6 + idx * 1.5;
            const floatY = [0, -10, 0];
            const floatRotate = [sn.rotation, sn.rotation + 2, sn.rotation - 2, sn.rotation];

            return (
              <motion.div
                key={`drag-${sn.id}`}
                id={`polaroid-${sn.id}`}
                drag
                dragConstraints={containerRef}
                dragElastic={0.08}
                dragMomentum={true}
                whileDrag={{ scale: 1.05, zIndex: 100, rotate: 0 }}
                animate={{
                  y: floatY,
                  rotate: floatRotate
                }}
                transition={{
                  y: { repeat: Infinity, duration: floatDuration, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: floatDuration + 1, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.04,
                  zIndex: 20,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setSelectedMemory(sn)}
                className="absolute w-44 sm:w-52 bg-zinc-950/95 border border-slate-800/80 rounded-xl p-3 sm:p-4 shadow-2xl cursor-grab active:cursor-grabbing origin-center flex flex-col gap-2.5 select-none transition-shadow hover:shadow-purple-500/10 hover:border-purple-500/20"
                style={{
                  boxShadow: '0 15px 40px -10px rgba(0,0,0,0.8)',
                  left: `${15 + (idx % 2) * 45}%`,
                  top: `${14 + Math.floor(idx / 2) * 44}%`,
                }}
              >
                {/* Decorative Tapes & Sticker Accents */}
                {sn.stickerType === 'tape' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5.5 bg-yellow-400/10 border-l border-r border-dashed border-yellow-300/20 backdrop-blur-[1.5px] z-20 pointer-events-none text-[8px] font-bold text-yellow-400 font-mono flex items-center justify-center uppercase tracking-wider -rotate-2">
                    Taped Mem
                  </div>
                )}
                {sn.stickerType === 'heart' && (
                  <div className="absolute -top-1.5 right-3 text-[9px] bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded border border-red-500/20 z-20 font-mono font-bold tracking-widest pointer-events-none uppercase">
                    ♥ KALU
                  </div>
                )}
                {sn.stickerType === 'pin' && (
                  <div className="absolute -top-2.5 left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-white/20 -translate-x-1/2 z-20 pointer-events-none shadow-md" />
                )}
                {sn.stickerType === 'star' && (
                  <div className="absolute -top-2 right-4 text-[13px] text-yellow-400 drop-shadow-md z-20 pointer-events-none select-none">
                    ⭐
                  </div>
                )}

                {/* Simulated Polaroid Glass Square Window */}
                <div className={`aspect-square bg-slate-900 rounded overflow-hidden relative border border-white/5 flex flex-col items-center justify-center relative transition-all ${sn.type === 'bracelet' ? 'hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]' : ''}`}>
                  <img
                    src={sn.imageUrl}
                    alt={sn.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none grayscale-[12%] hover:grayscale-0 transition-all duration-300 transform scale-102"
                  />

                  {/* Glass shimmer lighting gradient sheet */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-white/5 pointer-events-none" />

                  {/* Tiny decorative star watermark */}
                  <div className="absolute bottom-1.5 right-1.5 text-[8.5px] font-mono font-bold text-white/35">
                    17_ARC
                  </div>
                </div>

                {/* Polaroid Bottom Label Frame */}
                <div className="text-left select-none pointer-events-none mt-0.5">
                  <div className="flex justify-between items-baseline gap-1">
                    <h4 className="text-[11px] sm:text-xs font-bold text-purple-300 uppercase leading-none tracking-wide">
                      {sn.title}
                    </h4>
                    <span className="text-[8px] font-mono font-bold text-slate-500 tracking-wider">
                      {sn.date}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2 leading-relaxed italic">
                    "{sn.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Custom Soft-Focus Lightbox Overlay */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            id="lightbox-backdrop-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl"
          >
            {/* Click backdrop to exit */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedMemory(null)}
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#09090f]/95 border border-purple-500/20 p-6 sm:p-10 shadow-3xl shadow-purple-950/20 flex flex-col md:flex-row gap-8 sm:gap-10 items-stretch z-10 overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Background accent soft lights */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px]" />

              {/* Close Button */}
              <button
                id="close-lightbox-btn"
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 cursor-pointer hover:rotate-90 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Premium Enlarge polaroid render */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div
                  className="w-full max-w-[260px] sm:max-w-[280px] bg-zinc-950 border border-slate-800/90 p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col gap-3.5 origin-center transform -rotate-1 relative select-none"
                  style={{
                    boxShadow: '0 20px 50px -15px rgba(0,0,0,0.9)',
                  }}
                >
                  {/* Highlight sticker */}
                  <div className="absolute -top-3.5 left-1/3 w-16 h-5.5 bg-purple-500/10 border-l border-r border-dashed border-purple-500/30 backdrop-blur-[1px] font-mono text-[8.5px] font-bold text-purple-400/80 flex items-center justify-center tracking-widest leading-none uppercase">
                    INSPECTED
                  </div>

                  <div className="aspect-square bg-slate-900 rounded overflow-hidden relative border border-white/5">
                    <img
                      src={selectedMemory.imageUrl}
                      alt={selectedMemory.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover pointer-events-none select-none brightness-[95%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="text-left mt-0.5">
                    <div className="flex justify-between items-baseline gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">{selectedMemory.date}</span>
                      <span className="text-[8.5px] font-mono font-bold text-purple-400 underline decoration-purple-500/40">ID: {selectedMemory.id}</span>
                    </div>
                    <h4 className="text-sm font-bold text-purple-300 mt-1">{selectedMemory.title}</h4>
                  </div>
                </div>
              </div>

              {/* Right Side: Handwritten stories / thoughts block */}
              <div className="flex-1 flex flex-col justify-between py-2 relative z-10">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-450 uppercase tracking-[0.16em] bg-rose-950/40 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/10 inline-block leading-none">
                      {DETAILED_MEMORIES_STORIES[selectedMemory.id]?.badge || "Secret Log"}
                    </span>
                    <h3 className="text-2xl font-display font-medium text-slate-100 mt-2.5">
                      {selectedMemory.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 italic">
                      {DETAILED_MEMORIES_STORIES[selectedMemory.id]?.sub}
                    </p>
                  </div>

                  {/* Handwritten diary entry story */}
                  <blockquote className="text-sm text-slate-300 leading-relaxed font-sans font-light bg-slate-905/30 border-l-2 border-purple-500/40 pl-4 py-1.5 italic text-slate-350 pr-2">
                    "{DETAILED_MEMORIES_STORIES[selectedMemory.id]?.story}"
                  </blockquote>
                </div>

                {/* Hand-drawn style decorative doodle message */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="p-3.5 rounded-xl bg-purple-950/10 border border-purple-500/15 text-[11px] font-mono text-purple-300 flex items-center gap-2">
                    <span className="text-sm">⭐️</span>
                    <p className="leading-tight font-medium">
                      {DETAILED_MEMORIES_STORIES[selectedMemory.id]?.doodle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
