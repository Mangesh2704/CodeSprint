import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
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
app.get('/', (req, res)=> {
    res.send("Server working fine")
})

app.listen(Port, ()=> {
    console.log(`Server listening to port http://${localIp}:${Port}`);
})
