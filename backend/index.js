import express from 'express';
import dotenv from 'dotenv'
import authRoutes from  './routes/authRoutes.js'
dotenv.config()

const app = express();
const localIp = process.env.IP
const Port = process.env.PORT


app.use('/api/auth',authRoutes);


app.listen(Port, ()=> {
    console.log(`Server listening to port http://${localIp}:${Port}`);
})
