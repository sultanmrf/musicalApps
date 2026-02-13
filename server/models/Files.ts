import mongoose from "mongoose";

const posterSchema = new mongoose.Schema(
  {
    large: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    thumb: {
      type: String,
      required: true
    }
  },
  { _id: false } // مهم: ساب‌داکیومنت بدون id
);

const filesSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true
    },

    path: {
      type: String,
      required: true
    },

    artist: {
      type: String,
      default: "unknown",
      index: true
    },

    album: {
      type: String,
      default: ""
    },

    duration: {
      type: Number,
      default: 0
    },

    type: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["waiting", "published", "draft"],
      default: "waiting"
    },

    context: {
      type: String,
      default: ""
    },

    poster: {
      type: posterSchema,
      required: true
    },

    loves: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Files", filesSchema);
