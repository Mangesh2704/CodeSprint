import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import complaintRouter from './routes/complaintRouter.js'

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
}

connectDB().then(() => {
    console.log("Connected to DB from INDEX");
});

const app = express();
const localIp = process.env.IP;
const Port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware with MongoDB store
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        collectionName: 'sessions', // Collection where session data will be stored
        ttl: 14 * 24 * 60 * 60, // Session expiration time (14 days)
    }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

app.use('/user', userRouter);
app.use('/complaint', complaintRouter);


app.get('/', (req, res) => {
    res.send("Working fine");
});

app.listen(Port, () => {
    console.log(`Server listening to port http://${localIp}:${Port}`);
});
