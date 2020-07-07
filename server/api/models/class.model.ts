import moment from "moment";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const ClassSchema = new Schema({
  class_creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  class_creator_is_student:{
    type: Boolean,
    default: false,
  },
  class_creator_student:{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    default: "default_class",
  },
  members: [
    {
      type: Schema.Types.Mixed,
      ref: "User",
      default: null,
    },
  ],
  created_date: {
    type: Date,
    default: moment().format(),
  },
  invited_members: [
    {
      type: String,
      default: null,
    },
  ],
  class_code: {
    type: String,
    default: () => nanoid(6),
  },
  session_id: {
    type: String,
    default: null,
  },
});

const Class = mongoose.model("Class", ClassSchema);

export { Class };
