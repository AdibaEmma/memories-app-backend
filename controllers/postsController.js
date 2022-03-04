import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.js"

export const createPosts = async (req, res, next) => {
    const post = req.body
    console.log(req.headers);
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})

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

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
        await PostMessage.findByIdAndRemove(id)

        res.status(200).json({message: 'Post deleted successfully'})
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: err.message})
    }
}

export const likePost = async (req, res, next) => {
    try {
        const { id } = req.params

        if(!req.userId) return res.status(404).json({ message: 'Unauthenticated' })

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

        const post = await PostMessage.findById(id)

        const index = post.likes.findIndex(id => id === String(req.userId))

        if(index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { post}, { new: true })

        res.status(200).json(updatedPost)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message})
    }
}