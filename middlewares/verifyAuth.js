import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyAuth = async (req, res, next) => {

    const verificationCode = req.headers['x-verification-code']

    if (!verificationCode || verificationCode !== process.env.VERIFICATION_CODE) {
        return res.status(403).json({ message: 'No verification code' })
    }

    const refreshToken = req.cookies[process.env.COOKIE]

    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token' })
    }

    try {
        const decoded = await jwt.verify(refreshToken, process.env.PUBLIC_KEY)

        if (!decoded) return res.status(403).json({ message: 'Invalid refresh token' })

        req.user = decoded
        next()
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token has been expired' })
        }
        next(e)
    }
}