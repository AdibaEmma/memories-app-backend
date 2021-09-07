import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const app= express()



app.use(express.json({ limit: "30mb", extented: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
const live_api = true
const cloudURI = 'mongodb+srv://aweperi:Trinity1234@cluster0.ctxgm.mongodb.net/memories?retryWrites=true&w=majority&ssl=true'
const localDb = 'mongodb://localhost:27017/memories'
const CONNECTION_URL= live_api ?  cloudURI : localDb
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err.message);
    })
