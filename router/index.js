import { Router } from 'express'
import userRouter from './userRouter.js'
import { setCookie } from '../middlewares/setCookie.js'

const router = Router()

router.use('/user', userRouter).use(setCookie)

export default router