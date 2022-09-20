import express, { json, urlencoded } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import router from './router/index.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 8000

const server = express()

server.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}))
server.use(json())
server.use(urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/api', router)

try {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('Connected to DB')
    })
} catch (e) {
    console.log(e)
}

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})


