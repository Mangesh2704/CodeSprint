import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const localIp = process.env.IP
const Port = process.env.PORT

app.get('/', (req, res)=> {
    res.send("Server working fine")
})

app.listen(Port, ()=> {
    console.log(`Server listening to port http://${localIp}:${Port}`);
})
