import playlistModel from '../../models/Playlist'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const playlist = await playlistModel.create({
    name: body.name,
    description: body.description,
    userId: body.userId,
    cover: body.cover || "",
    songs: []
  })

  return playlist

})
