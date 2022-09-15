import {Schema, model } from 'mongoose'

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    role: {type: String, require: true, default: 'USER'}
})

export default model('UserSchema', UserSchema)