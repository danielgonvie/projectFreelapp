const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;

const portfolioSchema = new Schema(
  {
    description: { type: String },
    bgImage: { type: String },
    gallery: {
      imageDesc: { type: String },
      images: [{original:{ type: String }}],
      videoDesc: { type: String },
      videos: [{ type: String }],
      songDesc: { type: String },
      songs: [{ type: String }]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
