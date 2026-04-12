export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const playlist = await Playlist.findByIdAndUpdate(
    body.playlistId,
    {
      $pull: { songs: body.songId },
    },
    { new: true },
  );

  return playlist;
});
