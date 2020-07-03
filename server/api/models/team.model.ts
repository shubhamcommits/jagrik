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
});

const Team = mongoose.model("Team", TeamSchema);

export { Team };