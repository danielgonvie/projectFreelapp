const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;

const calendarSchema = new Schema(
  {
    resources: [{ id: String, name: String }],
    events: [
      {
        id: String,
        start: String,
        end: String,
        resourceId: String,
        title: String,
        description: String,
        resizable: { type: Boolean, default: true },
        movable: { type: Boolean, default: true },
        bgColor: { type: String, default: "#80C5F6" },
        rrule: { type: String }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
