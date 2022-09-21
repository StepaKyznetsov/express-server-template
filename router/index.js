import express from 'express'
import userRouter from './userRouter.js'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.use('/user', userRouter).use(process.env.setCookie)

export default router