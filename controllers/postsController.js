import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.js"

export const createPosts = async (req, res, next) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
} 

export const fetchPosts = async (req, res, next) => {
    try {
        const postMessages = await PostMessage.find()
        
        res.status(200).json(postMessages)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getPost = async (req, res, next) => {
    try {
        const { id: _id } = req.params 

        const postMessage = await PostMessage.findById(_id)

        res.status(200).json(postMessage)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: error.message })
    }
}

export const updatePost = async (req, res, next) => {

    try {
        const { id } = req.params
        const post = req.body
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

        res.status(200).json(updatedPost)
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: err.message})
    }
}