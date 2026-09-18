import type { Song } from "./song";

export interface PlayList {
  _id: string;
  name: string;
  description: string;
  cover: string;
  userId: string;
  songs: Song[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}