import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowUpRight } from 'lucide-react';
import { MEMORY_CARDS } from '../data';
import { MemoryCard } from '../types';

interface MemoryCardGridProps {
  onCardClick: (id: string) => void;
}

export default function MemoryCardGrid({ onCardClick }: MemoryCardGridProps) {
  // Translate sizes to beautiful design grid span classes to build an aesthetic portfolio feel
  const getGridSpan = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-1 h-72 sm:h-80';
      case 'tall':
        return 'col-span-1 row-span-2 h-[26rem] sm:h-[34rem]';
      default:
        return 'col-span-1 row-span-1 h-72 sm:h-80';
    }
  };

  return (
    <section id="interactive-grid-section" className="max-w-7xl mx-auto py-24 sm:py-32 px-6 sm:px-8 font-sans">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-14 sm:mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono font-bold text-thin text-purple-400 uppercase tracking-[0.18em] flex items-center gap-1.5 leading-none">
            <Sparkles className="w-4 h-4 animate-pulse text-purple-400" /> Embark in Digital Timelines
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mt-3 text-slate-100 uppercase sm:normal-case">
            Interactive Archives & Keepsakes
          </h2>
          <p className="text-slate-350 text-sm sm:text-base mt-3.5 max-w-2xl leading-relaxed font-light">
            Click on any capsule to unpack the lore. Warning: Contains high-density sarcasm, catastrophic gameplay records, and chaotic 2am brain waves.
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2 tracking-wide font-medium shrink-0">
          <Calendar className="w-4 h-4 text-purple-500" />
          <span>EST. SINCE OUR FIRST TOWER OF HELL DEBACLE</span>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[16rem] sm:auto-rows-[18rem]">
        {MEMORY_CARDS.map((card) => (
          <motion.div
            id={`memory-card-${card.id}`}
            key={card.id}
            onClick={() => onCardClick(card.id)}
            whileHover={{ 
              scale: 1.025, 
              y: -6,
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-3xl bg-slate-950/60 border ${card.glowColor} p-6 sm:p-9 flex flex-col justify-between relative group z-10 overflow-hidden backdrop-blur-xl transition-all duration-300 ${getGridSpan(card.size)}`}
            style={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Subtle inner ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />

            {/* Top Row: Type Indicator and Emoji badge */}
            <div className="flex justify-between items-start">
              <div className="w-13 h-13 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                {card.emoji}
              </div>
              <div className="text-slate-500 group-hover:text-purple-400 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Central Information */}
            <div className="flex flex-col gap-2 mt-auto">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-[0.15em] leading-none">
                {card.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight text-slate-100 group-hover:text-purple-300 transition-colors uppercase sm:normal-case mt-1">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed line-clamp-3 mt-1.5">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
