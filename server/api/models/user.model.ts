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
});

const User = mongoose.model("User", UserSchema);

export { User };
