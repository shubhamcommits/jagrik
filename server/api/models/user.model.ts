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
    default: 'default_user.png',
  },
  role: {
    type: String,
    required: true,
    default: 'student',
    enum: ['super-admin', 'facilitator', 'student'],
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
  hobbies: {
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
    default: 'general',
    enum: ['scheduled-caste', 'scheduled-tribe', 'obc', 'general'],
  },
  religion: {
    type: String,
    default: null,
  },
  created_date: {
    type: Date,
    default: moment().format(),
  },
  show_bonus_task: {
    type: Boolean,
    default: false,
  },
  taskIdAgainstBonusTask: {
    type: String,
    default: null,
  },
  bonus_tasks: [
    new Schema({
      bonus_task_id: {
        type: Schema.Types.ObjectId,
        ref: 'BonusTask',
        default: null,
      },
      show_bonus_task: {
        type: Boolean,
        default: false,
      },
      taskIdAgainstBonusTask: {
        type: String,
        default: null,
      },
      bonus_task_title: {
        type: String,
        default: null,
      },
      bonus_task_description: {
        type: String,
        default: null,
      },
      supporting_doc: {
        type: String,
        data: Buffer,
        default: null,
      },
      submitted_date: {
        type: Schema.Types.Date,
        default: null,
      },
      status: {
        type: String,
        default: 'Incomplete',
      },
    }),
  ],
  files: [
    {
      type: String,
      default: null,
    },
  ],
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      default: null,
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      default: null,
    },
  ],
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
  ],
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
      type: {
        type: Schema.Types.String,
        default: 'general',
        enum: ['general', 'wild'],
        required: true,
      },
      status: {
        type: Schema.Types.String,
        default: 'to do',
        enum: ['to do', 'in progress', 'waiting for score', 'completed'],
        required: true,
      },
      due_date: {
        type: Schema.Types.Date,
        default: moment().format(),
        required: true,
      },
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
      description: {
        type: String,
        data: Buffer,
      },
      bonus_task: {
        type: Boolean,
        default: false,
      },
      bonus_task_assigned_on: {
        type: Schema.Types.Date,
        default: null,
      },
    }),
  ],
});

const User = mongoose.model("User", UserSchema);

export { User };
