export interface MemoryCard {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  glowColor: string; // Tailwind class like shadow-purple-500/30 or border-purple-500
  size: 'normal' | 'large' | 'tall';
  description: string;
}

export interface SongRecommendation {
  id: string;
  title: string;
  artist: string;
  vibe: string;
  caption: string;
  youtubeId?: string; // Optional links for immersion
  spotifyId?: string;
}

export interface CursedScreenshot {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  stickerType: 'tape' | 'pin' | 'star' | 'heart' | 'none';
  rotation: number; // degrees of visual tilt for the polaroid look
  type: 'face' | 'bracelet' | 'toy' | 'flower' | 'discord' | 'roblox' | 'inside-joke' | 'meme';
}

export interface RobloxVideo {
  id: string;
  title: string;
  duration: string;
  vibe: string;
  description: string;
  videoUrl?: string; // Use elegant video assets or interactive high-quality cinematic animations
  previewThumbnail: string;
  views: string;
}

export interface InsideJokeChecklist {
  id: string;
  text: string;
  context: string;
  unlocked: boolean;
}
