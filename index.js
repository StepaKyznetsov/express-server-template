import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
import onError from "./utils/onError.js";

const PORT = process.env.PORT || 5000

const server = express()

server.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}))

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
})


