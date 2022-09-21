import { verifyToken } from '../utils/tokens.js'
import { TOKEN_SECRET } from '../constants.js'

export const verifyAccess = async (req, res, next) => {

    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
        return res.status(403).json({ message: 'No access token' })
    }

    try {

        const decoded = await verifyToken(accessToken, TOKEN_SECRET)
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid access token' })
        }
        req.user = decoded
        next()

    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token has been expired' })
        }
        next(e)
    }
}