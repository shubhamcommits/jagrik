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
  points: {
    type: String,
    default: '0'
  },
  created_date: {
    type: Date,
    default: moment().format(),
  },
  tasks: [
    new Schema({
      _task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
      _card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
      },
      week: {
        type: Number,
        required: true
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
        type: String
      },
      submitted_by: {
        type: String
      }
    })
  ]
});

const Team = mongoose.model("Team", TeamSchema);

export { Team };