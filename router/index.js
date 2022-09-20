import express from 'express'
import userRouter from './userRouter.js'
import {setCookie} from '../middlewares/setCookie.js'

const router = express.Router()

router.use('/user', userRouter).use(setCookie)

export default router