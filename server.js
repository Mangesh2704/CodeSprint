require("dotenv").config();
const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);
const connectDb = require('./utils/db');


connectDb().then(
    app.listen(process.env.PORT,()=>{
        console.log(`server is listening on port ${process.env.PORT}`)
    })
)