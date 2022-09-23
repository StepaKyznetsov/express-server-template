import express, { json, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import router from './router/index.js'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config()

const server = express()

server
    .use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
}))
    .use(helmet())
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cookieParser())
    .use('/api', router)

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

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started`)
})


