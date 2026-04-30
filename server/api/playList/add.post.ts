import playlistModel from "../../models/Playlist";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const playlist = await playlistModel.findByIdAndUpdate(
    body.playlistId,
    {
      $push: { songs: body.songId },
    },
    { new: true },
  );

  return playlist;
});
