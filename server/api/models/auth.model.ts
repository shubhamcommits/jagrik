import moment from 'moment'
import mongoose from 'mongoose'

const { Schema } = mongoose

const AuthSchema = new Schema({
    token: {
        type: String,
        default: null
    },
    device_id: {
        type: String,
        default: null
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    last_login: {
        type: Date,
        default: moment().format()
    },
    is_logged_in: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: moment().format()
    }
})

const Auth = mongoose.model('Auth', AuthSchema)

export { Auth }
