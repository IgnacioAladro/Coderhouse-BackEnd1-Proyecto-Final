import { Router } from "express";
const viewsRouter = Router();

import { __dirname } from '../path.js';

import { promises as fs } from 'fs';

import { socketServer } from "../server.js";



const loadProducts = async () => {
    try {
        const data = await fs.readFile(`${__dirname}/manager/products.json`, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        res.status(400).send('No se pueden cargar los productos')
        console.log(error);
    }
};

const allProducts = await loadProducts();

viewsRouter.get('/', (req, res) => {
    res.render('home', { products: allProducts });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: allProducts });

    socketServer.on('connection', (socket) => {
        console.log(`El usuario ${socket.id} esta mirando la lista de productos en tiempo real`);

        socket.on('disconnect', () => {
            console.log(`El usuario ${socket.id} se a desconectado`);
        });

        socket.on('productAdded', (product) => {
            socketServer.emit('productAdded', product);
        });

        socket.on('deleteProduct', (productId) => {
            socketServer.emit('deleteProduct', productId);
        });
    });
});

export default viewsRouter;