import filesModel from "../../models/Files";

export default defineEventHandler(async (event) => {
  try {
    const albums = await filesModel.aggregate([
      {
        $match: {
          album: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$album",
          artist: { $first: "$artist" },
          poster: { $first: "$poster" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return albums.map((album) => ({
      name: album._id,
      artist: album.artist,
      poster: album.poster,
      count: album.count,
    }));
  } catch(err) {
    console.error("Albums aggregate error:", err);
    return [];
  }
});
