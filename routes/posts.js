import express from 'express'

import { createPosts, deletePost, fetchPosts, getPost, updatePost, likePost } from '../controllers/postsController.js'
const router = express.Router()

router.post('/', createPosts)
router.get('/', fetchPosts)
router.get('/:id', getPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

export default router