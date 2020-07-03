import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    data: Buffer,
    default: "default_user.png",
  },
  role: {
    type: String,
    required: true,
    default: "student",
    enum: ["super-admin", "facilitator", "student"],
  },
  phone_number: {
    type: String,
    default: null,
  },
  mobile_number: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  date_of_birth: {
    type: Date,
    default: null,
  },
  emergency_contact_name: {
    type: String,
    default: null,
  },
  emergency_contact_number: {
    type: Number,
    default: null,
  },
  block: {
    type: String,
    default: null,
  },
  district: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  social_media_username: {
    type: String,
    default: null,
  },
  in_school: {
    type: Boolean,
    default: true,
  },
  caste_category: {
    type: String,
    required: true,
    default: "general",
    enum: ["scheduled-caste", "scheduled-tribe", "obc", "general"],
  },
  religion: {
    type: String,
    default: null,
  },
  created_date: {
    type: Date,
    default: moment().format(),
  },
  files: [
    {
      type: String,
      default: null,
    },
  ],
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },
  ],
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
  ],
  task: {
    _task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    week: {
      type: Schema.Types.Number,
      default: 1,
      required: true,
      enum: [1, 2, 3, 4, 5]
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
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
