import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    url: String,
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Song ||
  mongoose.model("Song", songSchema);
