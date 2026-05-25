import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, MessageCircle, HeartOff, Code } from 'lucide-react';
import { FRIENDS_NAME, FRIENDS_NICKNAME } from '../data';

export default function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates from -0.5 to 0.5
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-16 font-sans">
      {/* Background Soft Purple/Cyan Ambient Glow Spots */}
      <div 
        className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none transition-transform duration-500"
        style={{
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-indigo-950/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-500"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
        }}
      />

      {/* Floating Sparkles decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + (i * 17) % 70}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full text-center relative z-20 flex flex-col items-center gap-6">
        {/* Connection status pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 bg-slate-950/90 border border-purple-500/30 rounded-full px-5 py-2.5 shadow-xl backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400/80" /> Established via Roblox & Discord
          </span>
        </motion.div>

        {/* Big Beautiful Wholesome Title */}
        <div className="flex flex-col gap-6 md:gap-8 mt-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-100 to-cyan-250 drop-shadow-xl leading-tight sm:leading-none"
            style={{
              transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`
            }}
          >
            Happy Birthday {FRIENDS_NAME}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-sans tracking-wide max-w-2xl mx-auto font-light leading-relaxed px-2"
          >
            A small, cozy corner of the internet made for <span className="text-purple-300 font-mono font-semibold underline decoration-purple-500/40 underline-offset-6 text-lg sm:text-xl">{FRIENDS_NICKNAME}</span>.
          </motion.h2>
        </div>

        {/* Subtle Decorative Friendship Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 p-5 rounded-2xl border border-purple-500/10 bg-slate-900/40 backdrop-blur-xl max-w-lg w-full items-center text-left shadow-lg mt-4"
        >
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-[0.15em]">Friendship Core Arc</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed font-light">
              No real-life checklists or meetups. Just pure midnight chaos, dumb debates, yapping, and standard Life Together shit.
            </p>
          </div>
        </motion.div>

        {/* Anchor point reminder to explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2.5"
        >
          <span className="text-[11px] font-mono font-bold text-purple-400/80 uppercase tracking-[0.25em]">SCROLL TO UNLOCK LARES</span>
          <div className="w-[1.5px] h-14 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </header>
  );
}
