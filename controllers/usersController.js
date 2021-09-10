import bcrypt from 'bcryptjs'
import { json } from 'body-parser'
import jwt from 'jsonwebtoken'

import User from '../models/user'

export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const validPassword = await bcrypt.compare(password, existingUser.password)

        if(!validPassword) return res.status(400).json({ message: "Invalid credentials"})

        const token = json.sign({ email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
} 