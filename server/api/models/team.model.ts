import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team_name: {
    type: Schema.Types.String,
    required: true,
  },
  team_members: [
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
  task: [{
    _task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    week: {
      type: Schema.Types.Number,
      default: 1,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    status: {
      type: Schema.Types.String,
      default: 'to do',
      enum: ['to do', 'in progress', 'waiting for score', 'completed'],
      required: true
    },
    due_date: {
      type: Schema.Types.Date,
      default: moment().format(),
      required: true
    },
    supporting_doc: {
      type: String,
      data: Buffer,
    },
    experience_description: {
      type: String,
    },
    submitted_by: {
      type: String,
    },
  }]
});

const Team = mongoose.model("Team", TeamSchema);

export { Team };