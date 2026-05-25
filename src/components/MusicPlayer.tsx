import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Radio, ChevronRight, Play } from 'lucide-react';
import { SPOTIFY_PLAYLIST_URL, FRIENDS_NICKNAME } from '../data';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle play states
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="cozy-music-player" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-80 backdrop-blur-xl bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 shadow-2xl shadow-purple-500/10 flex flex-col gap-3"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-mono text-purple-300">VIBE STATION</span>
              </div>
              <button 
                id="close-music-card"
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                Close
              </button>
            </div>

            {/* Custom music playing cover card */}
            <div className="bg-slate-900/50 rounded-xl p-3 border border-white/5 flex items-center gap-3">
              <div className="relative w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                <Music className={`w-6 h-6 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="flex gap-1 items-end">
                      <span className="w-1 h-3 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 h-4 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <span className="w-1 h-2 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-100 truncate">Late Night Lofi Session</h4>
                <p className="text-xs text-slate-400 truncate">Perfect code, yaps & {FRIENDS_NICKNAME} obby runs</p>
              </div>
              <button
                id="toggle-spotify-aud"
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all text-xs"
              >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>

            {/* Embed Loader */}
            {isPlaying && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 80 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden rounded-xl bg-slate-900/40 border border-white/5 transition-all"
              >
                <iframe
                  title="Spotify Player"
                  src={SPOTIFY_PLAYLIST_URL}
                  width="100%"
                  height="80"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl border-none pointer-events-auto"
                />
              </motion.div>
            )}

            <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500 font-mono">
              <Radio className="w-3 h-3 text-purple-400" />
              <span>SPONTANEOUS DISCORD SOUNDS & BEATS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Circle Trigger node */}
      <motion.button
        id="music-trigger-node"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isPlaying) {
            setIsPlaying(true); // Automatically starts when expanding for cleaner flow
          }
        }}
        className="relative group w-14 h-14 rounded-full bg-slate-950/90 border border-purple-500/40 hover:border-purple-400 shadow-lg flex items-center justify-center text-purple-400 hover:text-purple-300 cursor-pointer overflow-hidden"
        style={{
          boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Continuous soft equalizer animations */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="relative w-7 h-7 flex items-center justify-center"
            >
              <Volume2 className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500" />
            </motion.div>
          ) : (
            <motion.div key="paused" className="flex flex-col items-center justify-center">
              <VolumeX className="w-5 h-5 text-slate-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small tooltip hover badge */}
        <span className="absolute right-16 top-3 bg-slate-950/90 border border-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          {isPlaying ? 'Mute Session' : 'Cozy Music'}
        </span>
      </motion.button>
    </div>
  );
}
