import filesModel from "../../models/Files";

export default defineEventHandler(async (event) => {
  const artistName = decodeURIComponent(event.context.params.artist)
  const songs = await filesModel.find({ artist: artistName })
  return songs
})
