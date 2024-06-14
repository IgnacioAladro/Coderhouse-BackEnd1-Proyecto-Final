import express from "express";
const app = express();

import productRouter from './routes/product.router.js';

import cartRouter from './routes/cart.router.js';

import { __dirname } from './path.js';

import { errorHandler } from './middlewares/errorHandler.js';

import { initMongoDB } from './daos/mongodb/connection.js';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.use(errorHandler);


initMongoDB();


const PORT = 8080;
app.listen(PORT, () => console.log(`Server OK --> port ${PORT}`));