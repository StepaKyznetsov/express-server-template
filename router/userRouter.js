import express from 'express'
import { registration, login, logout } from '../services/userService.js'
import {verifyAccess} from '../middlewares/verifyAccess.js'

const userRouter = express.Router()

userRouter
    .post('/registration', registration)
    .post('/login', login)
    .get('/logout', verifyAccess, logout)

export default userRouter