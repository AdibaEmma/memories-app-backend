import express from 'express'

import { createPosts, fetchPosts, updatePost } from '../controllers/postsController.js'
const router = express.Router()

router.post('/', createPosts)
router.get('/', fetchPosts)
router.patch('/:id', updatePost)
export default router