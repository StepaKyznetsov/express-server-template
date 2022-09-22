import { Router } from 'express'
import { getUser, registration, login, logout } from '../services/userService.js'
import { verifyAccess } from '../middlewares/verifyAccess.js'
import { verifyAuth } from '../middlewares/verifyAuth.js'

const userRouter = Router()

userRouter
    .get('/', verifyAuth, getUser)
    .post('/registration', registration)
    .post('/login', login)
    .get('/logout', verifyAccess, logout)

export default userRouter