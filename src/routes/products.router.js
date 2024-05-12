import { Router } from 'express';
const productsRouter = Router();

import { productManager } from '../server.js';



productsRouter.get('/', async(req, res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        };

        return res.json(products);

    } catch (error) {
        res.send('A ocurrido un error')
        console.log(error);
    };
});

productsRouter.get('/:pid', async(req, res) => {
    const { pid } = req.params;
    try {
        const products = productManager.getProductById(pid);
        res.json(products);
    } catch (error) {
        res.send(`A ocurrido un error con la solicitud del ID --> ${pid}`)
        console.log(error);
    };
});

productsRouter.post('/', async(req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const productAdded = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.json(productAdded);
    } catch (error) {
        res.send('No se a podido agregar el producto')
        console.log(error);
    };
});



export { productsRouter };