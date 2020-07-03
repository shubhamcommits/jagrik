import moment from 'moment'
import mongoose from 'mongoose'

const { Schema } = mongoose

const TaskSchema = new Schema({

    title: {
        type: Schema.Types.String,
        required: true
    },
    content: {
        type: Schema.Types.String,
        required: true
    },
    type: {
        type: Schema.Types.String,
        enum: ['gold', 'silver', 'bronze'],
        required: true
    },
    points: {
        type: Schema.Types.Number,
        default: 0
    },
    created_date: {
        type: Date,
        default: moment().format()
    },
    _card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
    }
})

const Task = mongoose.model('Task', TaskSchema)

export { Task }
