import express from "express";
const app = express();

import { __dirname } from './path.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';

import { ProductManager } from "./manager/productManager.js";
export const productManager = new ProductManager;
import { productsRouter } from "./routes/products.router.js";

import { CartManager } from "./manager/cartManager.js";
export const cartManager = new CartManager;
import { cartsRouter } from "./routes/carts.router.js";

import { Server } from "socket.io";



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');



app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server OK --> port ${PORT}`));

const socketServer = new Server(httpServer);
export { socketServer };