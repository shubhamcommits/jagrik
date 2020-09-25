import moment from 'moment';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CollaborateSchema = new Schema({
  team_1: {
    type: String,
    required: true,
  },
  team_2: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: moment().format(),
  },
});

const Collaborate = mongoose.model('Collaborate', CollaborateSchema);

export { Collaborate };
