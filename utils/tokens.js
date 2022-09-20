import jwt from 'jsonwebtoken'

export const signToken = async(payload, secret, options) => {
    await jwt.sign(payload, secret, options)
}

export const verifyToken = async(payload, secret, options) => {
    await jwt.verify(payload, secret, options)
}