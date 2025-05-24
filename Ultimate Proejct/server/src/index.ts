import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import developerRoutes from './routes/developerRoutes'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/developer', developerRoutes)

const PORT = process.env.PORT || 500

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})