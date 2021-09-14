import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const validPassword = await bcrypt.compare(password, existingUser.password)

        if(!validPassword) return res.status(400).json({ message: "Invalid credentials"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})

        res.status(200).json({result: existingUser, token})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong'})
    }
}

export const signup = async (req, res, next) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(409).json({ message: "User already exist."})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"})

        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: '1h'})

        return res.status(201).json({result: result, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong'})
    }
}