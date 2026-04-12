export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const playlist = await Playlist.findByIdAndUpdate(
    body.playlistId,
    {
      $push: { songs: body.songId },
    },
    { new: true },
  );

  return playlist;
});
