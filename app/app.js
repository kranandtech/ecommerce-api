import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import productsRouter from '../routes/productRoute.js';
dbConnect();

const app = express();

app.use(express.json());

// routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products/',productsRouter);
//err middleware handler
app.use(notFound);
app.use(globalErrHandler);

export default app;

