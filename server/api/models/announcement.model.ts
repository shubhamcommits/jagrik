import moment from "moment";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const AnnouncementSchema = new Schema({
  announcement_class: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  created_date: {
    type: Date,
    default: moment().format(),
  },
  announcement_doc: {
    type: String,
    data: Buffer,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export { Announcement };