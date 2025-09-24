const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const foodRoutes = require('./routes/food.route');
const foodRoute = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
})


app.use('/api/auth', authRoutes );
app.use('/api/food', foodRoutes );
app.use('/api/food-partner', foodRoute );


module.exports = app;