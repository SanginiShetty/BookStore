import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
// import { Book } from './models/bookModels.js';
import bookRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORD POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to Mern Stack Development');
});

app.use('/api', bookRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});