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
  secretHint: string;
  rows: CrosswordRow[];
  victoryVideoUrl: string;
  backgroundImageUrl?: string; // Custom background
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