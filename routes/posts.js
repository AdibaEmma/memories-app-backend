import express from 'express'

import { createPosts, deletePost, fetchPosts, getPost, updatePost, likePost } from '../controllers/postsController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, createPosts)
router.get('/', fetchPosts)
router.get('/:id', getPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router