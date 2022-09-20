import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
    email:
        {
            type: String,
            required: true,
            unique: true
        },
    password:
        {
            type: String,
            required: true
        },
    name:
        {
            type: String,
            required: true,
            unique: true
        },
    role:
        {type: String,
            required: true,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        }
})

export default model('UserSchema', UserSchema)