import { Genre } from '@/types/genre';

export const GENRE_LABELS: Record<Genre, string> = {
  all: '종합',
  philosophy: '철학',
  science: '과학',
  economy: '경제',
};

export const GENRE_IDS: Record<string, number> = {
  economics: 3,
  science: 2,
  philosophy: 1,
};
