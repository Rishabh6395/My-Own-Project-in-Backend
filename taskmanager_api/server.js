import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import taskRoutes from './routes/taskRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())


app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening at: ${PORT}`))
