import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { X, Play, Music, ExternalLink, Calendar, Plus, ExternalLink as LaunchIcon, MessageSquare, Gamepad2, Info } from 'lucide-react';
import { 
  SONG_RECOMMENDATIONS, 
  CURSED_SCREENSHOTS, 
  ROBLOX_VIDEOS, 
  FRIENDS_NICKNAME 
} from '../data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export default function Modals({ isOpen, onClose, type }: ModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id={`modal-${type}-container`} 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans"
      >
        {/* Blurred Dark Backdrop Overlay */}
        <motion.div
          id="modal-backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl sm:backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Window Core Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-950/90 border border-purple-500/30 p-8 sm:p-10 md:p-12 shadow-2xl shadow-purple-500/10 flex flex-col gap-8 z-10 custom-scrollbar pointer-events-auto backdrop-blur-2xl"
          style={{
            boxShadow: '0 0 45px rgba(168, 85, 247, 0.18)',
          }}
        >
          {/* Close button top right */}
          <button
            id={`close-${type}-modal`}
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 cursor-pointer hover:rotate-90 transition-all z-20 text-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Render target content dynamically depending on type */}
          {type === 'song-recommendations' && <SongRecommendationsView />}
          {type === 'cursed-screenshots' && <CursedScreenshotsView />}
          {type === 'roblox-memories' && <RobloxMemoriesView />}
          {type === 'roblox-chaos' && <RobloxChaosView />}
          {type === 'discord-lore' && <DiscordLoreView />}
          {type === '2am-yapping' && <TwoAmYappingView />}
          {type === 'kalu-moments' && <KaluMomentsView />}
          {type === 'procastination' && <ProcrastinationView />}

          {/* Symmetrical simple footer */}
          <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-500">
            <span>SECURE SECRETS DECRYPTED</span>
            <span>COZINESS: 100% v1.7</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ==========================================
// 1. SONG RECOMMENDATIONS SUBVIEW
// ==========================================
function SongRecommendationsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-[0.18em] flex items-center gap-1.5 leading-none">
          <Music className="w-4 h-4 text-purple-400/80" /> Cozy Playlist Sharing
        </span>
        <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 mt-3">
          Songs You Shared & Listened
        </h3>
        <p className="text-slate-350 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
          The ultimate soundtrack of late-night study streams, quiet hours, and Roblox lobbies
        </p>
      </div>

      <div className="grid gap-4 mt-3">
        {SONG_RECOMMENDATIONS.map((song, i) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/70 hover:border-purple-500/25 transition-all group gap-4 shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-mono font-bold text-sm border border-purple-500/10">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h4 className="text-base font-semibold text-slate-100 group-hover:text-purple-300 transition-colors uppercase tracking-wide">
                  {song.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-medium">{song.artist}</p>
              </div>
            </div>

            <div className="flex-1 max-w-md md:mx-8">
              <span className="inline-block text-[9.5px] font-mono font-bold bg-purple-950/70 text-purple-300 px-3 py-1 rounded-full mb-1.5 uppercase tracking-wider border border-purple-500/10">
                {song.vibe}
              </span>
              <p className="text-xs sm:text-sm text-slate-400 font-light italic leading-relaxed">"{song.caption}"</p>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono font-bold bg-slate-950 border border-purple-500/25 hover:bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full cursor-pointer transition-all uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Listening at 2AM
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. CURSED SCREENSHOTS SCRAPBOOK VIEW
// ==========================================
function CursedScreenshotsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono font-bold text-rose-450 uppercase tracking-[0.18em] flex items-center gap-1.5 leading-none">
          <Calendar className="w-4 h-4 text-rose-400/80" /> Preserved Memory Vault
        </span>
        <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 mt-3">
          Our Curated Keepsake Archive
        </h3>
        <p className="text-slate-350 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
          A selection of tiny details, symbolic objects, and most importantly, YOU.
        </p>
      </div>

      {/* Styled polaroid scrapbook array */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4">
        {CURSED_SCREENSHOTS.map((sn, i) => (
          <motion.div
            key={sn.id}
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: sn.rotation }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            transition={{ duration: 0.4 }}
            className={`bg-zinc-950/95 border border-slate-800/80 rounded-xl p-5 shadow-2xl relative group flex flex-col gap-4 select-none ${sn.type === 'bracelet' ? 'hover:shadow-[0_0_20px_rgba(168,85,247,0.18)] hover:border-purple-500/25' : ''}`}
            style={{
              boxShadow: '0 15px 35px -8px rgba(0,0,0,0.6)',
            }}
          >
            {/* Decorative Tape Sticker representation */}
            {sn.stickerType === 'tape' && (
              <div 
                className="absolute -top-3.5 left-1/3 w-20 h-6 bg-yellow-400/10 backdrop-blur-[1px] border-l border-r border-dashed border-yellow-300/20 -rotate-3 z-20 pointer-events-none font-mono text-[8.5px] text-yellow-300/80 flex items-center justify-center uppercase tracking-wider"
              >
                SECURE RECORD
              </div>
            )}
            {sn.stickerType === 'pin' && (
              <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-md border border-white/20 z-20 -translate-x-1/2 pointer-events-none" />
            )}
            {sn.stickerType === 'heart' && (
              <div className="absolute top-2 right-2 text-rose-400/90 text-[9px] font-mono tracking-widest z-20 uppercase bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 pointer-events-none font-bold">
                ♥ KALU
              </div>
            )}
            {sn.stickerType === 'star' && (
              <div className="absolute -top-1.5 right-1/4 text-yellow-400 text-lg z-20 pointer-events-none select-none">🌟</div>
            )}

            {/* Polaroid Photo Box - Real generated photo */}
            <div className="aspect-[4/3] bg-slate-900 border border-white/5 rounded overflow-hidden relative flex flex-col justify-center items-center">
              <img 
                src={sn.imageUrl} 
                alt={sn.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[95%] grayscale-[10%] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
              />

              {/* Glowing decorative frame layout */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[9px] font-mono font-bold bg-black/50 text-purple-300 px-2.5 py-0.5 rounded backdrop-blur border border-purple-500/10">
                MEM_ID: {sn.id}
              </div>
            </div>

            {/* Polaroid Bottom Label Frame */}
            <div className="text-slate-200 mt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-purple-300 tracking-wide uppercase">{sn.title}</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">{sn.date}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans italic">
                "{sn.caption}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. ROBLOX MEMORIES EMBED VIEW
// ==========================================
function RobloxMemoriesView() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <div>
        <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-[0.18em] flex items-center gap-1.5 leading-none">
          <Gamepad2 className="w-4 h-4 text-cyan-400/80" /> Roblox Recording Archives
        </span>
        <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 mt-3">
          Roblox Moments & Funny Clips
        </h3>
        <p className="text-slate-350 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
          Nostalgic clips.
        </p>
      </div>

      <div className="grid gap-6 mt-4">
        {ROBLOX_VIDEOS.map((vid, i) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col lg:flex-row items-stretch rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 hover:bg-slate-900/50 transition-all overflow-hidden gap-5 p-5 lg:p-6"
          >
            {/* Cinematic Embedded Dummy or YouTube Player */}
            <div className="relative aspect-video lg:w-96 rounded-xl overflow-hidden bg-black border border-white/5 shadow-inner shrink-0 group">
              <iframe
                title={vid.title}
                src={vid.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-none rounded-xl hover:scale-[1.01] transition-transform"
              />
              {/* Fallback frame cover styling */}
              <div className="absolute top-2 left-2 z-10 pointer-events-none bg-slate-950/80 border border-white/5 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest text-cyan-400 uppercase">
                CLIPS ARCHIVE
              </div>
            </div>

            {/* Video Descriptions */}
            <div className="flex-1 flex flex-col justify-between py-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/10 uppercase">
                    {vid.vibe}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Duration: {vid.duration}</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-100 uppercase tracking-tight hover:text-cyan-300 transition-colors">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {vid.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>COMEDIC VALUE: PEAK</span>
                <span>{vid.views}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. ROBLOX CHAOS DETAILED CARD
// ==========================================
function RobloxChaosView() {
  return (
    <div className="flex flex-col gap-5 font-sans">
      <div className="p-3.5 w-13 h-13 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl border border-purple-500/10 shrink-0 self-start">
        🎮
      </div>
      <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 uppercase sm:normal-case tracking-tight">
        The Roblox Chaos Log
      </h3>
      <div className="text-slate-350 text-sm sm:text-base leading-relaxed space-y-5 font-light">
        <p>
          First day we queued a Roblox game lobby together, it was clear this was not going to be a peaceful normal friendship. The way you would rubberband around the map sometimes, teleporting in random directions due to hackerss in the game was FUNNY AF, used to make my day.
        </p>
        <p>
          Every lobby we joined became a funny test of patience. The trolling, jumping past difficult laser obstacles, and you being a NOOB failing most of the time LOLL.
        </p>
        <div className="bg-purple-950/20 border border-purple-500/25 p-5 sm:p-6 rounded-2xl mt-6 shadow-md">
          <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-[0.15em] mb-3">🏅 Cognitive Achievements Log</h4>
          <ul className="text-xs sm:text-sm space-y-2 list-disc pl-5 text-slate-400 font-mono">
            <li>Died 43,000 times in parkour and obstacle courses but still claimed we are pro speedrunners</li>
            <li>Spent 4 hours customizing Roblox avatars just to end up wearing a trashcan costume</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. DISCORD LORE CARD
// ==========================================
function DiscordLoreView() {
  return (
    <div className="flex flex-col gap-5 font-sans">
      <div className="p-3.5 w-13 h-13 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl border border-indigo-500/10 shrink-0 self-start">
        🔊
      </div>
      <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 uppercase sm:normal-case tracking-tight">
        The Discord Call Chronicles
      </h3>
      <div className="text-slate-350 text-sm sm:text-base leading-relaxed space-y-5 font-light">
        <p>
          If Discord calls had a server storage fee, we would be in infinite debt. Our friendship is basically built on 8-hour silent screen shares where half the time we don't even speak—we just share the comforting silence of both staring at Roblox, homework essays, or just being together.
        </p>
        <div className="bg-indigo-950/20 border border-indigo-500/25 p-5 sm:p-6 rounded-2xl mt-6 shadow-md">
          <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-[0.14em] mb-3">📁 Server Voice Protocol Summary</h4>
          <ul className="text-xs sm:text-sm space-y-2 list-disc pl-5 text-slate-400 font-mono">
            <li>"Wait your mic sounds like you are inside a toaster right now"</li>
            <li>"Sleep is a social construct: confirmed at 04:31 AM"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. 2AM YAPPING SESSIONS DETAILED CARD
// ==========================================
function TwoAmYappingView() {
  return (
    <div className="flex flex-col gap-5 font-sans border-b border-white/5 pb-6">
      <div className="p-3.5 w-13 h-13 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center text-2xl border border-fuchsia-500/10 shrink-0 self-start">
        💬
      </div>
      <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 uppercase sm:normal-case tracking-tight">
        Cozy Late Night Yap Stations
      </h3>
      <div className="text-slate-350 text-sm sm:text-base leading-relaxed space-y-5 font-light">
        <p>
          Starting the call with a humble "yo what's up" and ending up discussing why humans don't have tails or just any other random ass topic.
        </p>
        <p>
          These 2 AM yap sessions are the highlight of my weeks. Celebrating 17 years of you existing on this planet—spreading ultimate sarcastic commentary, being a professional menace, and ESPECIALLYY keeping me completely sane through school stress.
        </p>
        <blockquote className="border-l-3 border-fuchsia-500 pl-5 py-2.5 italic font-light text-slate-250 text-base sm:text-lg my-4 font-sans bg-fuchsia-500/5 rounded-r-xl">
          "Honestly, some of my absolute best internet-core memories are just sitting here listening to Kalu give me the most unhinged advice on earth while blasting ur playlist. Wholesome. Emotional. Hilarious."
        </blockquote>
      </div>
    </div>
  );
}

// ==========================================
// 7. PEAK KALU MOMENTS CHRONICLES
// ==========================================
function KaluMomentsView() {
  return (
    <div className="flex flex-col gap-5 font-sans">
      <div className="p-3.5 w-13 h-13 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-2xl border border-pink-500/10 shrink-0 self-start">
        👑
      </div>
      <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 uppercase sm:normal-case tracking-tight">
        Peak Kalu Moments Matrix
      </h3>
      
      <p className="text-slate-350 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
        Let's perform a technical diagnostic evaluation of your legendary chaotic persona in digital channels.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
        <div className="p-6 rounded-2xl bg-pink-950/10 border border-pink-500/20 shadow-md">
          <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-[0.14em] block">STATISTICS LOG</span>
          <h4 className="text-xl font-display font-medium text-slate-200 mt-2 uppercase">Aura Balance</h4>
          <p className="text-3xl sm:text-4xl font-extrabold text-pink-400 mt-3 font-mono">-10,000 AURA</p>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-950/10 border border-indigo-500/20 shadow-md">
          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-[0.14em] block">TRAIT METRICS</span>
          <h4 className="text-xl font-display font-medium text-slate-200 mt-2 uppercase">Core Attributes</h4>
          <div className="space-y-3 mt-4.5 font-mono text-xs sm:text-sm text-slate-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-light text-slate-400">Menace Level:</span>
              <span className="text-indigo-400 font-bold">100% Cosmic</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-light text-slate-400">Sarcasm Efficiency:</span>
              <span className="text-indigo-400 font-bold">Max Limit</span>
            </div>
            <div className="flex justify-between">
              <span className="font-light text-slate-400">Being NOOB in every game:</span>
              <span className="text-indigo-400 font-bold">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. PROFESSIONAL PROCRASTINATORS PANEL
// ==========================================
function ProcrastinationView() {
  return (
    <div className="flex flex-col gap-5 font-sans">
      <div className="p-3.5 w-13 h-13 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl border border-blue-500/10 shrink-0 self-start">
        📝
      </div>
      <h3 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 uppercase sm:normal-case tracking-tight">
        The Homework Escape Guild
      </h3>
      <div className="text-slate-350 text-sm sm:text-base leading-relaxed space-y-5 font-light">
        <p>
          The absolute peak of multi-tasking. I genuinly remember opening Physics Wallah website while being on roblox with u 🤣😂.
        </p>
        <p>
          Somehow we still survive our school assignments despite dedicating 95% of our brain to random shit. Happy 17th birthday, Kalu! Thanks for always being my "co-leader" in procrastination and unhinged late-night research!
        </p>
      </div>
    </div>
  );
}
