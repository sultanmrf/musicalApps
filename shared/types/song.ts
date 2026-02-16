import type { MediaPoster } from './media'

export type SongStatus = 'waiting' | 'play' | 'stop';

export interface Song {
  _id: string;
  fileName: string;
  path: string;
  type: string;
  size: number;
  status: SongStatus
  context: string;
  poster: MediaPoster;
}