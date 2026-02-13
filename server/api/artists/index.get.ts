import filesModel from "../../models/Files";

export default defineEventHandler(async () => {
  try {
    const artists = await filesModel.aggregate([
      {
        $group: {
          _id: "$artist",
          artist: { $first: "$artist" },
          poster: { $first: "$poster" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$artist",
          poster: 1,
          count: 1,
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    return artists;
  } catch (err) {
    console.error("Artists aggregate error:", err);
    return [];
  }
});
