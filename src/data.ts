import { MemoryCard, SongRecommendation, CursedScreenshot, RobloxVideo, InsideJokeChecklist } from './types';
import memFace from "../assets/images/YourBeautifulFace.webp";
import memBracelet from "../assets/images/mem_bracelet_photo_1779738915021.webp";
import memToy from "../assets/images/mem_toy_photo_1779738934012.webp";
import memFlower from "../assets/images/mem_flower_photo_1779738952463.webp";
import vid1 from "../assets/Videos/VID_20260505_000513.mp4";
import vid2 from "../assets/Videos/VID_20260505_000612.mp4";
import vid3 from "../assets/Videos/VID_20260505_005604.mp4";
// ==========================================
// CENTRAL CONFIGURATION
// ==========================================

export const FRIENDS_NAME = "Ridham";
export const FRIENDS_NICKNAME = "Kalu";
export const FRIENDS_AGE = 17;

// SPOTIFY PLAYLIST: Easily customisable from this single value
// Default is a peaceful lofi chill playlist
export const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/37i9dQZF1DX8UbtRl5gfvK";

// Generated image imports/references
export const ROBLOX_ILLUSTRATION = "../assets/images/roblox_concept_1779735511544.png";
export const DISCORD_ILLUSTRATION = "../assets/images/discord_cozy_1779735529148.png";
export const BIRTHDAY_CAKE_ILLUSTRATION = "../assets/images/dreamy_cake_1779735547302.png";

// ==========================================
// CARD DEFINITIONS
// ==========================================
export const MEMORY_CARDS: MemoryCard[] = [
  {
    id: "roblox-chaos",
    title: "Roblox Chaos & Lore",
    subtitle: "Lagging, trolling, and getting beaten in games.",
    emoji: "🎮",
    glowColor: "shadow-purple-500/20 border-purple-500/40 hover:border-purple-400",
    size: "large",
    description: "Every lobby we joined never remained peaceful. From ragdoll glitches to me beating u in every game 😛😛, our Roblox arc was pure unfiltered peak entertainment."
  },
  {
    id: "discord-lore",
    title: "Discord Call Lore",
    subtitle: "Muted mics mostly.",
    emoji: "🔊",
    glowColor: "shadow-indigo-500/20 border-indigo-500/40 hover:border-indigo-400",
    size: "normal",
    description: "The 4-hour silent calls where we just breathe, the midnight screen-shares, and the active struggle when MY Discord decides to lag exactly in peak moments 😭😭."
  },
  {
    id: "2am-yapping",
    title: "2 AM Yap Sessions",
    subtitle: "Solving theoretical parallel universes while we should be asleep.",
    emoji: "💬",
    glowColor: "shadow-fuchsia-500/20 border-fuchsia-500/40 hover:border-fuchsia-400",
    size: "tall",
    description: "Starting with a simple 'hey' and ending up discussing random topics."
  },
  {
    id: "cursed-screenshots",
    title: "Preserved Keepsakes",
    subtitle: "A silent record of physical & digital memory fragments.",
    emoji: "💖",
    glowColor: "shadow-rose-500/20 border-rose-500/40 hover:border-rose-400",
    size: "large",
    description: "Tiny details, symbolic objects, and physical anchors representing an irreplaceable online bond. Click to inspect."
  },
  {
    id: "kalu-moments",
    title: "Peak Kalu Moments",
    subtitle: "Just you being an absolute menace and comedic power.",
    emoji: "👑",
    glowColor: "shadow-pink-500/20 border-pink-500/40 hover:border-pink-400",
    size: "normal",
    description: "Times where you either pulled of a -1000 IQ move or roasting me so hard I felt my soul temporarily exit my body 😂😂."
  },
  {
    id: "procastination",
    title: "Professional Procrastinators",
    subtitle: "Assignments? Due in 1 hour? Let's play Roblox instead.",
    emoji: "📝",
    glowColor: "shadow-blue-500/20 border-blue-500/40 hover:border-blue-400",
    size: "normal",
    description: "I had to open my study website just to avoid doing my actual studies and also so that my parents wouldn't notice."
  },
  {
    id: "song-recommendations",
    title: "Vibe Recommendations",
    subtitle: "Late-night headphones in, cozy friendship soundtrack.",
    emoji: "🎵",
    glowColor: "shadow-violet-500/20 border-violet-500/40 hover:border-violet-400",
    size: "large",
    description: "The music we send each other during late-night study sessions, gaming, or general yapping. Click for a wholesome playlist swap."
  },
  {
    id: "roblox-memories",
    title: "Roblox Memories",
    subtitle: "The archives of our digital playground.",
    emoji: "👾",
    glowColor: "shadow-cyan-500/20 border-cyan-500/40 hover:border-cyan-400",
    size: "tall",
    description: "A showcase of epic blocky screenshots, clips of total confusion, and the beautiful square clouds under which our friendship evolved."
  }
];

// ==========================================
// SONG RECOMMENDATIONS (COZY CHILL VIBES)
// ==========================================
export const SONG_RECOMMENDATIONS: SongRecommendation[] = [
  {
    id: "song-1",
    title: "Space Song",
    artist: "Beach House",
    vibe: "Cozy Late Night / Nostalgic",
    caption: "For when we are both staring at the Discord status 'Revra is typing...' for solid 20 minutes wondering what legendary text is coming.",
    youtubeId: "RBClGZp4W44"
  },
  {
    id: "song-2",
    title: "Are You Bored Yet?",
    artist: "Wallows (feat. Clairo)",
    vibe: "Pure Chill / Roblox Gaming Background Music",
    caption: "The perfect background theme when we Talking to people in Life Together at 1 AM.",
    youtubeId: "wgn80u8B6No"
  },
  {
    id: "song-4",
    title: "Coffee Alley",
    artist: "Lofi Fruits Music",
    vibe: "Study/Yap Chill Beat",
    caption: "The ultimate beat for yapping: doing NEET prep work on screen 1, playing to Roblox with you on screen 2.",
    youtubeId: "X_KOf0C-UqM"
  },
  {
    id: "song-5",
    title: "Fly Me to the Moon",
    artist: "Lofi Cover",
    vibe: "Late Night Space Lounge",
    caption: "A wholesome soundtrack to celebrate 17 full years of you existing and spreading absolute chaotic, unhinged internet friendship.",
    youtubeId: "kOkQ4T5GHy8"
  }
];

// ==========================================
// CURSED SCREENSHOTS & CHAT SNIPPETS (OUR 4 SACRED MEMORIES)
// ==========================================
// Scrapbook-style polaroid objects containing precisely 4 curated items
export const CURSED_SCREENSHOTS: CursedScreenshot[] = [
  {
    id: "mem-face",
    title: "A Quiet Portrait",
    date: "Dec 2021",
    caption: "A soft, nostalgic moment captured in golden twilight—the human behind the late-night text bubbles.",
    imageUrl: memFace,
    stickerType: "tape",
    rotation: -3,
    type: "face"
  },
  {
    id: "mem-bracelet",
    title: "The Silver Star",
    date: "July 2023",
    caption: "A tangible token of starry skies and late hours. Tiny detail, huge meaning.",
    imageUrl: memBracelet,
    stickerType: "heart",
    rotation: 4,
    type: "bracelet"
  },
  {
    id: "mem-toy",
    title: "The Desk Guardian",
    date: "Late Night Calls",
    caption: "Keeping watch through every discord texting session or while us playing roblox.",
    imageUrl: memToy,
    stickerType: "pin",
    rotation: -5,
    type: "toy"
  },
  {
    id: "mem-flower",
    title: "The Pressed Lavender",
    date: "Spring Equinox",
    caption: "A delicate dried fragment symbolizing quiet appreciation, warmth, and growing together.",
    imageUrl: memFlower,
    stickerType: "star",
    rotation: 3,
    type: "flower"
  }
];

// ==========================================
// ROBLOX MEMORIES & INTERACTIVE RECORDINGS
// ==========================================
// For embedding clips/moments inside our cinematic player config
export const ROBLOX_VIDEOS: RobloxVideo[] = [
  {
    id: "vid-1",
    title: "Me Getting Brutally Stabbed",
    duration: "0:45",
    vibe: "Max Pain",
    description: "JUST WHYYY 😭😭😭.",
    videoUrl: vid1,
    previewThumbnail:"",
    views: "10 views (mainly us rewatching)"
  },
  {
    id: "vid-2",
    title: "Me Getting BEATEN (WHYY) with a stick",
    duration: "1:20",
    vibe: "Chaotic Trader Arc",
    description: "Kalu domination",
    videoUrl: vid2,
    previewThumbnail:"",
    views: "10 views"
  },
  {
    id: "vid-3",
    title: "US DANCING",
    duration: "0:30",
    vibe: "-1000 IQ gameplay",
    description: "Sighhhh Finally The Fun Part Yayyyyyyyyyyy 😊😊",
    videoUrl: vid3,
    previewThumbnail: "",
    views: "10 views"
  }
];

// ==========================================
// REAL-TIME INSIDE JOKES & MILESTONES
// ==========================================
export const INSIDE_JOKES_CHECKLIST: InsideJokeChecklist[] = [
  { id: "joke-1", text: "Agreed that pineapple on pizza is a war crime but Adopt Me pizzas are pre-approved", context: "Adopt Me Chef Guild", unlocked: true },
  { id: "joke-2", text: "Successfully stayed awake till sunrise without a single real-life conversation", context: "Late Night Discord Crew", unlocked: true },
  { id: "joke-3", text: "Cried from laughing so hard at a completely pixelated Roblox dancing cat", context: "Roblox Memes", unlocked: true },
  { id: "joke-4", text: "Used the phrase 'no u' or 'ratio' in a critical high-stakes spelling debate", context: "Discord Arena", unlocked: true },
  { id: "joke-5", text: "Survived Kalu's 3-hour theoretical timeline of our Roblox Adopt Me wealth accumulation", context: "Yapping session #452", unlocked: true },
  { id: "joke-6", text: "Actually turning 17 and remaining the coolest menace in the server!", context: "The Final Boss Arc", unlocked: false }
];
