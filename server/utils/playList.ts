export function populatePlaylistSongs(playlist: any): any {
  if (!playlist) return playlist;

  const allSongs = findAll<any>("songs");
  const songs = (playlist.songs || [])
    .map((id: string) => allSongs.find((s: any) => s._id === id))
    .filter(Boolean);

  return { ...playlist, songs };
}