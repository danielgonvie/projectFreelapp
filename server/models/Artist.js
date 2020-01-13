const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;

const artistSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3 },
    picture: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/dogeshibe/images/3/36/FB_IMG_1509393840683.jpg/revision/latest?cb=20180520065331"
    },
    name: { type: String, required: true },
    alias: { type: String },
    toggleAlias: {
      type: String,
      enum: ["name", "alias", "both"],
      default: "both"
    },
    topArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    fans: [
      { type: Schema.Types.ObjectId, ref: "User" },
      { type: Schema.Types.ObjectId, ref: "Artist" }
    ],
    location: {
      city: { type: String},
      country: { type: String}
    },
    category: {
      type: String,
      enum: ["photo", "tattoo", "design", "music"]
      
    },
    subcategory: { type: String },
    portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio" },
    availability: {
      type: String,
      enum: ["0", "1", "2", "3", "4"]
    },
    calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
    contactEmail: { type: String },
    contactPhone: { type: String },
    social: {
      instagram: { type: String },
      github: { type: String },
      soundcloud: { type: String },
      other: { type: String }
    },
    bannerImg: { type: String }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
