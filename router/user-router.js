import express from 'express'
import UserController from '../controllers/user-controller.js'

const userRouter = express.Router()

userRouter.post('/reg', UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)

export default userRouter