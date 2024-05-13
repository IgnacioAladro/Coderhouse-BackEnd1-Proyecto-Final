import { Router } from 'express';
const productsRouter = Router();

import { productManager } from '../server.js';



productsRouter.get('/', async(req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        };
        return res.status(200).json(products);
    } catch (error) {
        res.status(400).send('A ocurrido un error')
        console.log(error);
    };
});

productsRouter.get('/:pid', async(req, res) => {
    const { pid } = req.params;
    try {
        const products = await productManager.getProductById(pid);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send(`A ocurrido un error con la solicitud del ID --> ${pid}`)
        console.log(error);
    };
});

productsRouter.post('/', async(req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const productAdded = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.status(200).json(productAdded);
    } catch (error) {
        res.status(400).send('No se a podido agregar el producto')
        console.log(error);
    };
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const productUpdated = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });
        res.status(200).json(productUpdated);
    } catch (error) {
        res.status(400).send('No se a podido actualizar el producto')
        console.log(error);
    };
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.status(200).send(`Se a eliminado el producto ${pid}`);
    } catch (error) {
        res.status(400).send('No se a podido eliminar el producto');
        console.log(error);
    };
});



export { productsRouter };