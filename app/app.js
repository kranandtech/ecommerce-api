import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrHandler } from '../middlewares/globalErrHandler.js';
dbConnect();
const app = express();

app.use(express.json());

// routes
app.use('/',userRoutes);

//err middleware handler
app.use(globalErrHandler);

export default app;

