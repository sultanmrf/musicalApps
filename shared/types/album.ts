import type { MediaPoster } from './media'

export interface Album {
  name: string;
  count: number;
  artist: string;
  poster: MediaPoster;
}