import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
import onError from './utils/onError.js'
import router from './router/index.js'

const PORT = process.env.PORT || 8000

const server = express()

server.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}))

server.use('/api', router)

try {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('Connected to DB')
    })
} catch (e) {
    onError(e)
}

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
    console.log(process.env.PORT)
})


