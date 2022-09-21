import express, { json, urlencoded } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/index.js'
import cookieParser from 'cookie-parser'
import { PORT, ALLOWED_ORIGIN, MONGODB_URI } from './constants.js'

const server = express()

server.use(cors({
    origin: ALLOWED_ORIGIN,
    credentials: true
}))
server.use(json())
server.use(urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/api', router)

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('Connected to DB')
    })
} catch (e) {
    console.log(e)
}

server.listen(PORT || 8000, () => {
    console.log(`Server started, port: ${PORT}`)
})


