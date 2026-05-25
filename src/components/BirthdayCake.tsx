import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Flame, FlameKindling } from 'lucide-react';
import { BIRTHDAY_CAKE_ILLUSTRATION, FRIENDS_NICKNAME } from '../data';

interface EmojiBlast {
  id: number;
  emoji: string;
  x: number; // translation offset
  y: number;
  rotation: number;
  delay: number;
}

interface CrumbParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function BirthdayCake() {
  const [slices, setSlices] = useState(6); // 6 slices total
  const [candleLit, setCandleLit] = useState(true);
  const [blasts, setBlasts] = useState<EmojiBlast[]>([]);
  const [crumbs, setCrumbs] = useState<CrumbParticle[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);

  const triggerCelebration = () => {
    // Generate upward floating emojis
    const emojis = ['🥳', '🎉', '🎊', '✨', '🎈', '❤️', '👾', '🕹️'];
    const newBlasts: EmojiBlast[] = [];
    for (let i = 0; i < 18; i++) {
      newBlasts.push({
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: (Math.random() - 0.5) * 300, // random dispersion
        y: -(Math.random() * 250 + 100),
        rotation: (Math.random() - 0.5) * 90,
        delay: Math.random() * 0.2
      });
    }
    setBlasts(newBlasts);

    // Filter blasts after animation finishes
    setTimeout(() => {
      setBlasts([]);
    }, 3000);
  };

  const handleCakeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTotalClicks((prev) => prev + 1);

    // Position of clip inside element to generate crumbs at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;

    if (candleLit) {
      setCandleLit(false);
      triggerCelebration();
      return;
    }

    if (slices > 0) {
      // Spawn crumb particles
      const newCrumbs: CrumbParticle[] = [];
      for (let i = 0; i < 8; i++) {
        newCrumbs.push({
          id: Date.now() + i,
          x: clickX + (Math.random() - 0.5) * 40,
          y: clickY + (Math.random() - 0.5) * 40,
          size: Math.random() * 6 + 3,
        });
      }
      setCrumbs((prev) => [...prev, ...newCrumbs]);
      setSlices((prev) => prev - 1);

      // Clean up old crumbs
      setTimeout(() => {
        setCrumbs((prev) => prev.filter((c) => !newCrumbs.includes(c)));
      }, 1000);
    }
  };

  const handleResetCake = () => {
    setSlices(6);
    setCandleLit(true);
    setBlasts([]);
    setCrumbs([]);
    setTotalClicks(0);
  };

  // Build a custom clip-path based on remaining slices representing a simple clockwise circle sector removal
  const getCakeClipPath = () => {
    if (slices === 6) return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'; // full circle
    if (slices === 5) return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 25% 0%)';
    if (slices === 4) return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)';
    if (slices === 3) return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    if (slices === 2) return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)';
    if (slices === 1) return 'polygon(50% 50%, 50% 0%, 75% 0%, 100% 0%)';
    return 'polygon(50% 50%, 50% 50%)'; // None
  };

  return (
    <section id="interactive-cake-section" className="relative max-w-3xl mx-auto py-24 sm:py-32 px-6 sm:px-8 font-sans">
      <div 
        className="w-full relative rounded-3xl bg-slate-950/70 border border-purple-500/30 p-8 sm:p-12 text-center backdrop-blur-xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 35px rgba(168, 85, 247, 0.12)'
        }}
      >
        {/* Decorative corner glows */}
        <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

        <div className="mb-8">
          <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-[0.18em] flex items-center justify-center gap-1.5 leading-none">
            <Sparkles className="w-4 h-4 text-purple-400" /> Interactive Experiment
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mt-3 text-slate-100">
            There's a Cake For You 🎂
          </h2>
          <p className="text-slate-350 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed font-light">
            {candleLit 
              ? "Click on the cake to blow out the glowing 17 candle!" 
              : slices > 0 
              ? `Keep clicking to finish the cake! (${slices} slices left)`
              : "Wait, look what you carried out..."}
          </p>
        </div>

        {/* Cake Canvas Interactive Wrap */}
        <div className="relative w-64 h-64 mx-auto my-8 flex items-center justify-center select-none">
          {/* Confetti Emoji Blasts */}
          <AnimatePresence>
            {blasts.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, x: b.x, y: b.y, scale: [1, 1.3, 1], rotate: b.rotation }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: b.delay }}
                className="absolute text-xl z-30 pointer-events-none"
              >
                {b.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Slicing Crumb particles */}
          {crumbs.map((c) => (
            <motion.div
              key={c.id}
              initial={{ scale: 1, opacity: 0.9, x: c.x, y: c.y }}
              animate={{ y: c.y + 40, opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.8 }}
              className="absolute bg-purple-400/80 rounded-full z-20 pointer-events-none"
              style={{ width: c.size, height: c.size }}
            />
          ))}

          {/* Candle Flame overlay details */}
          <AnimatePresence>
            {candleLit && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: -40 }}
                className="absolute z-30 top-1.5 flex flex-col items-center pointer-events-none"
              >
                {/* Moving SVG Flame */}
                <motion.div
                  animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="w-5 h-8 bg-gradient-to-t from-red-500 via-yellow-400 to-white rounded-full blur-[1px] relative inline-block shadow-md"
                  style={{
                    boxShadow: '0 -4px 10px rgba(239, 68, 68, 0.8), 0 0 15px rgba(253, 224, 71, 0.6)'
                  }}
                />
                {/* Candle Stick */}
                <div className="w-1.5 h-8 bg-purple-100 rounded-sm border-t border-purple-500 shadow-sm" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Birthday Cake Graphic Container */}
          <div 
            onClick={handleCakeClick}
            className={`relative w-52 h-52 rounded-full cursor-pointer overflow-hidden transition-transform duration-300 ${slices > 0 ? 'hover:scale-[1.03] active:scale-[0.98]' : ''}`}
            style={{
              clipPath: getCakeClipPath(),
              transition: 'clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s',
            }}
          >
            {slices > 0 ? (
              <img
                src={BIRTHDAY_CAKE_ILLUSTRATION}
                alt="Glowing Birthday Cake"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 border border-dashed border-white/10 rounded-full flex flex-col items-center justify-center p-4">
                <span className="text-3xl">🍽️</span>
                <span className="text-[10px] font-mono text-slate-500 mt-2">EMPTY GLOSSY DESIGNS</span>
              </div>
            )}
          </div>

          {/* Halo Starry platform backing */}
          <div className="absolute inset-0 border border-purple-500/10 rounded-full scale-105 pointer-events-none z-0" />
        </div>

        {/* Display response status */}
        <div className="min-h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {candleLit ? (
              <motion.p
                key="blown"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs sm:text-sm font-mono font-semibold text-purple-400 animate-pulse tracking-[0.16em]"
              >
                🕯️ CANDLE IS BURNING STEADY
              </motion.p>
            ) : slices > 0 ? (
              <motion.p
                key="eat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs sm:text-sm font-mono font-semibold text-cyan-400 tracking-[0.16em]"
              >
                🎂 NOM NOM NOM... CHOMPING SLICES!
              </motion.p>
            ) : (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3.5 mt-2"
              >
                <p className="text-base sm:text-lg font-display font-medium text-rose-400 tracking-wide">
                  "bro save some for others 😭"
                </p>
                <button
                  id="reset-cake-button"
                  onClick={handleResetCake}
                  className="flex items-center gap-2 text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25 px-5 py-2.5 rounded-full cursor-pointer hover:bg-purple-500/25 transition-all tracking-[0.1em] uppercase shadow-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Bake another cake
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
