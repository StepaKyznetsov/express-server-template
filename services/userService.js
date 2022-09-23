import UserSchema from '../models/user.js'
import argon2 from 'argon2'
import * as dotenv from 'dotenv'
dotenv.config()

export const getUser = async (req, res, next) => {

    const userId = req.user?.userId

    if (!userId) return res.status(400).json({ message: `Need user's ID` })

    try {
        req.user = await UserSchema.findById(userId)
        next('route')
    } catch (e) {
        next(e)
    }
}

export const registration = async (req, res, next) => {

    const email = req.body?.email
    const password = req.body?.password
    const role = req.body?.role

    if (!email || !password) return res.status(400).json({ message: 'Empty email or password' })

    try {
        const isAlreadyExist = await UserSchema.findOne({ email })
        if (isAlreadyExist) return res.status(409).json({ message: 'This email is already taken' })

        const hashedPassword = await argon2.hash(password)

        const newUser = await UserSchema.create({
            email,
            password: hashedPassword,
            role
        })

        req.user = { userId: newUser.id, role }
        next('route')
    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {

    const email = req.body?.email
    const password = req.body?.password

    if (!email || !password) return res.status(400).json({ message: 'Empty email or password' })

    try {
        const user = await UserSchema.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Incorrect email' })

        const isPasswordEqual = await argon2.verify(user.password, password)
        if (!isPasswordEqual) return res.status(403).json({ message: 'Something wrong' })

        req.user = { userId: user.id, role: user.role }
        next('route')
    } catch (e) {
        next(e)
    }
}

export const logout = (req, res, next) => {
    res.clearCookie(process.env.COOKIE)
    res.status(200).json({ message: 'User logged out' })
}

