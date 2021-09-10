import express from 'express'

import { signUp, signIn } from '../controllers/usersController.js'

router.post('/signup', signUp)
router.post('/signin', signIn)
const router = express.Router()