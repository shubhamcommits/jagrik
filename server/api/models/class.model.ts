import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const ClassSchema = new Schema({
  class_creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: String,
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
});

const Class = mongoose.model("Class", ClassSchema);

export { Class };
