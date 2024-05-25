import { Router } from "express";
const router = Router();

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

router.get('/', (req, res) => {
    res.render('home', { products: allProducts });
});

export default router;