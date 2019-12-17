const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3 },
    picture: {
      type: String,
      default:
        "https://www.stickpng.com/assets/images/5845e770fb0b0755fa99d7f4.png"
    },
    name: { type: String },
    topArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }]
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

const User = mongoose.model("User", userSchema);
module.exports = User;
