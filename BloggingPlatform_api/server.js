import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Mongo is connected!!')
    app.listen(PORT, () => console.log(`Server is listing at PORT: ${PORT}`))
}).catch(err => console.log('DB connectiong error ', err))



