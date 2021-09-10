import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
const app= express()

dotenv.config()

app.use(express.json({ limit: "30mb", extented: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res, next) => {
    res.send('Hello to Memories API  ')
})
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) })
    }).catch( err => console.log(err.message) )
