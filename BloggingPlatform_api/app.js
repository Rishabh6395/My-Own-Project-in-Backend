import express from 'express'
import cors from 'cors'
import useRoutes from './routes/userRoutes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/users', useRoutes)

app.get('/', (req,res) => {
    res.send('Welcome to the Blog API')
})

export default app;

