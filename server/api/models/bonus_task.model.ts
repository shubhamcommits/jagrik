import moment from "moment";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const BonusTaskSchema = new Schema({
  task_class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
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
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

const BonusTask = mongoose.model("BonusTask", BonusTaskSchema);

export { BonusTask };