import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export const setCookie = async (req, res, next) => {

    const user = req.body
    if (!user) return res.status(400).json({ message: 'No user' })

    try{
        const accessToken = await jwt.sign(
            {
                userId: user.userId, role: user.role
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )

        let refreshToken
        if (!req.cookies[process.env.COOKIE]) {
            refreshToken = await jwt.sign(
                {
                    userId: user.userId
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: '7d'
                }
            )
            res.cookie(process.env.COOKIE, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
        }

        res.status(200).json({ user, accessToken })
    } catch (e) {
        next(e)
    }
}