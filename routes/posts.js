import express from 'express'

import { createPosts, deletePost, fetchPosts, getPost, updatePost } from '../controllers/postsController.js'
const router = express.Router()

router.post('/', createPosts)
router.get('/', fetchPosts)
router.get('/:id', getPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

export default router