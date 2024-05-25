import { Router } from "express";
const viewsRouter = Router();

import { __dirname } from '../path.js';

import { promises as fs } from 'fs';



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
});

export default viewsRouter;