import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const ClassSchema = new Schema({
  class_creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    default: 'default_class'
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
});

const Class = mongoose.model("Class", ClassSchema);

export { Class };
