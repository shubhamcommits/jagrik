import moment from 'moment'
import mongoose from 'mongoose'

const { Schema } = mongoose

const GroupSchema = new Schema({
    group_name: {
        type: String,
        required: true
    },
    members: [
        {
          type: Schema.Types.Mixed,
          ref: "User",
          default: null,
        },
      ],
    clsssId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        default: null, 
    },
    group_creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    created_date: {
        type: Date,
        default: moment().format()
    }
})

const Group = mongoose.model("Group", GroupSchema)

export { Group }
