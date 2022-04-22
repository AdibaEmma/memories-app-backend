import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app= express()
app.use(cors({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization',
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}))
dotenv.config()

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'



app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true}))

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res, next) => {
    res.send('Hello to Memories API  ')
})
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) })
    }).catch( err => console.log(err.message) )
