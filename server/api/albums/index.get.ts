export default defineEventHandler(async (event) => {
  try {
    const allSongs = findAll<any>("songs");
    const albumMap: Record<string, any> = {};

    for (const song of allSongs) {
      if (!song.album || song.album === null) continue;

      if (!albumMap[song.album]) {
        albumMap[song.album] = {
          name: song.album,
          artist: song.artist,
          poster: song.poster,
          count: 0,
        };
      }
      albumMap[song.album].count++;
    }

    const albums = Object.values(albumMap).sort(
      (a: any, b: any) => b.count - a.count
    );

    return albums;
  } catch (err) {
    console.error("Albums group error:", err);
    return [];
  }
});
