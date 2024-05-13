import { Router } from "express";
const cartsRouter = Router();

import { cartManager } from "../server.js";



cartsRouter.post('/', async (req, res) => {
    try {
        const cart = await cartManager.newCart();
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).send('Ocurrio un error al intentar crear el carrito');
    };
});

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartProducts(cid);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).send('Ocurrio un error al intetar mostrar los productos del carrito')
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProduct(cid, pid);
        res.status(200).send('Producto agregado al carrito');
    } catch (error) {
        res.status(400).send('Error al intentar guardar producto en el carrito');
    };
});



export { cartsRouter };