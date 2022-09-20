import UserSchema from '../models/user.js'
import bcrypt from 'bcrypt'

export const registration = async (res, req, next) => {

    const email = req.body?.email
    const password = req.body?.password
    const role = req.body?.role

    if (!email || !password) return res.status(400).json({ message: 'Empty email or password' })

    try {

        const isAlreadyExist = await UserSchema.find({email})
        if (isAlreadyExist) return res.status(409).json({ message: 'This email is already taken' })

        const hashedPassword = bcrypt.hash(password, 3)

        const newUser = await UserSchema.create({
            email,
            password: hashedPassword,
            role
        })

        req.user = { userId: newUser.id, role }

    } catch (e) {
        next(e)
    }
}

export const login = async (res, req, next) => {

    const email = req.body?.email
    const password = req.body?.password

    if (!email || !password) return res.status(400).json({ message: 'Empty email or password' })

    try {

        const user = UserSchema.findOne({email})
        if (!user) return res.status(404).json({message: 'Incorrect email'})

        const isPasswordEqual = bcrypt.compare(password, user.password)
        if (!isPasswordEqual) return res.status(403).json({ message: 'Something wrong' })

        req.user = { userId: user.id, role: user.role }

    } catch (e) {
        next(e)
    }
}

export const logout = () => {

}

