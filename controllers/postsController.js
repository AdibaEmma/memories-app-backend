import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res, next) => {
    try {
        const postMessages = await PostMessage.find()
        
        res.status(200).json(postMessages)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createPosts = (req, res, next) => {
    res.send('Post Creation')
} 