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

socketServer.on('connection', (socket) => {
    console.log(`El usuario ${socket.id} esta mirando la lista de productos en tiempo real`);

    socket.on('disconnect', () => {
        console.log(`El usuario ${socket.id} se a desconectado`);
    });

    socket.on('productAdded', async(product) => {
        socketServer.emit('productAdded', product);
    });

    socket.on('deleteProduct', async(productId) => {
        socketServer.emit('deleteProduct', productId);
    });
});



export { socketServer };