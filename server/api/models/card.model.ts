import moment from 'moment'
import mongoose from 'mongoose'

const { Schema } = mongoose

const CardSchema = new Schema({

    theme: {
        type: Schema.Types.String,
        default: 'fundamental duties',
        enum: ['fundamental duties', 'fundamental rights', 'child rights'],
        required: true
    },
    dice_number: {
        type: Schema.Types.Number,
        default: 1,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    },
    description: {
        type: Schema.Types.String,
        default: 'Description',
        required: true
    },
    created_date: {
        type: Date,
        default: moment().format()
    },
})

const Card = mongoose.model('Card', CardSchema)

export { Card }
