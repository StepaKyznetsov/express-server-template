import {Schema, model } from'mongoose'

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
})

export default model('UserSchema', UserSchema)