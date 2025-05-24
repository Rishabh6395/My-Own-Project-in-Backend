import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    const {name, email, password, role} req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword, role},
        })
        res.status(201).json(user)
    } catch (err){
        res.status(400).json({error: 'User already exists or invalid data'})
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        const user = await prisma.user.findUnique({where: {email}})
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error: 'Invalid Credentials'})
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, expiresIn: '7d')
        res.json({token,user})
    }
    catch (err) {
        res.status(500).json({error: 'Server Error'})
    }
}