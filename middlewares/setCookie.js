import { signToken } from '../utils/tokens.js'
import * as dotenv from 'dotenv'
dotenv.config()

export const setCookie = async (req, res, next) => {

    const user = req.user

    if (!user) return res.status(400).json({message: 'No user'})

    try{

        const accessToken = await signToken(
            { userId: user.userId, role: user.role },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '30m'
            }
        )

        let refreshToken
        if (!req.cookies[process.env.COOKIE]) {
            refreshToken = await signToken({ userId: user.userId }, process.env.PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '7d'
            })

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