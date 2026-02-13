export interface Song {
  _id: string;
  fileName: string;
  path: string;
  type: string;
  size: number;
  status: string;
  context: string;
  poster: {
    large: string;
    medium: string;
    thumb: string;
  };
}
