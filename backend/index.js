import express, { json } from 'express';
import dotenv from 'dotenv'
import userRouter from  './routes/userRouter.js'
import complaintRouter from './routes/complaintRouter.js'
import cors from 'cors'
import mongoose from 'mongoose';
dotenv.config()

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
}

connectDB().then(()=> {
    console.log("Connected to DB from INDEX")
})


const app = express();
const localIp = process.env.IP
const Port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/user', userRouter);
app.use('/complaint', complaintRouter);


app.get('/', (req, res)=> {
    res.send("Working fine")
})

app.listen(Port, ()=> {
    console.log(`Server listening to port http://${localIp}:${Port}`);
})
