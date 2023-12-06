const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// importing files
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
// Middlewares
app.use(express.json());
app.use(cors({
    origin: '*'
}));


app.use('/user', userRoutes)

app.listen(PORT, ()=>{
    console.log("Server Running at port: ",PORT);
})