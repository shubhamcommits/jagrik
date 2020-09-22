import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team_name: {
    type: Schema.Types.String,
    required: true,
  },
  team_members: [
    {
      type: Schema.Types.Mixed,
      ref: 'User',
      default: null,
    },
  ],
  points: {
    type: String,
    default: '0',
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
        required: true,
      },
      status: {
        type: Schema.Types.String,
        default: 'to do',
        enum: [
          'to do',
          'in progress',
          'waiting for score',
          'completed',
          'rejected',
        ],
        required: true,
      },
      type: {
        type: Schema.Types.String,
        default: 'general',
        enum: [
          'general',
          'wild'
        ],
        required: true,
      },
      is_active: {
        type: Schema.Types.String,
        default: 'active',
        enum: ['active', 'inactive'],
        required: true,
      },
      due_date: {
        type: Schema.Types.Date,
        default: moment().format(),
        required: true,
      },
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      remark: {
        type: String,
        default: null,
      },
      reason: {
        type: String,
      },
      bonus_point: {
        type: Number,
        default: 0,
      },
      ques_review: [
        new Schema({
          question: {
            type: String,
          },
          answer: {
            type: String,
          },
        }),
      ],
      supporting_doc: {
        type: String,
        data: Buffer,
      },
      supporting_docs: [
        {
          type: String,
          data: Buffer,
        },
      ],
      experience_description: {
        type: String,
      },
      submitted_by: {
        type: String,
      },
    }),
  ],
});

const Team = mongoose.model("Team", TeamSchema);

export { Team };