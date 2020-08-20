import moment from "moment";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const ClassSchema = new Schema({
  class_creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  class_creator_is_student: {
    type: Boolean,
    default: false,
  },
  is_open: {
    type: Boolean,
    default: true,
  },
  class_creator_student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    default: 'default_class',
  },
  members: [
    {
      type: Schema.Types.Mixed,
      ref: 'User',
      default: null,
    },
  ],
  schedules: [
    new Schema({
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: moment().format(),
      },
      time: {
        type: String,
      },
      create: {
        type: String,
      },
      create_rec: {
        type: String,
      },
      end_url: {
        type: String,
        data: Buffer,
      },
      get_all_recording: {
        type: String,
      },
      get_meeting_info: {
        type: String,
      },
      get_meeting_url: {
        type: String,
      },
      get_recording_url: {
        type: String,
      },
      is_meeting_running: {
        type: String,
      },
      join_attende: {
        type: String,
      },
      join_moderate: {
        type: String,
      },
      status: {
        type: Boolean,
        default: true,
      },
    }),
  ],
  groups: [
    {
      type: Schema.Types.Mixed,
      ref: 'Group',
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
  files: [
    new Schema({
      _title: {
        type: String,
      },
      _description: {
        type: String,
      },
      _img: {
        type: String,
        data: Buffer,
      },
      _upload_file: {
        type: String,
        data: Buffer,
      },
    }),
  ],
});

const Class = mongoose.model("Class", ClassSchema);

export { Class };
