export interface CrosswordRow {
  id: string;
  question: string;
  answer: string; // Uppercase, no spaces
  contributesAtIndex: number; // 1-based index
  imageUrl?: string; // URL for the question image
}

export interface GameConfig {
  title: string;
  secretKeyword: string;
  secretHint: string; // Text hint (optional now)
  secretHintImages?: string[]; // Array of URLs for visual hints
  rows: CrosswordRow[];
  victoryImageUrl?: string; // Replaces video
  victoryVideoUrl?: string; // Kept for backward compatibility or optional use
  backgroundImageUrl?: string; // Custom background
  backgroundMusicUrl?: string; // URL for MP3
  logoUrl?: string; // Custom Logo
  isEditorMode?: boolean;
}

export type GameStatus = 'playing' | 'victory';

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}