import * as service from '../services/cart.services.js'



export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(400).json({ msg: `No se a podido encontrar el carrito ${id}` });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    };
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (!newCart) res.status(400).json({ msg: `No se a podido crear el carrito solicitado` });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    };
};

export const clearCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const clearCart = await service.clearCart(idCart);
        if (!clearCart) res.json({ msg: `Ocurrio un error y no se a podido vaciar el carrito ${idCart}`});
        else res.json(clearCart);
    } catch (error) {
        next(error.message);
    };
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartUpdated = await service.update(id, req.body);
        if (!cartUpdated) res.status(400).json({ msg: `No se a podido actualizar el carrito ${id}` });
        else res.status(200).json(cartUpdated);
    } catch (error) {
        next(error.message);
    };
};

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newProductToCart = await service.addProductToCart(
            idCart,
            idProd,
        );
        if (!newProductToCart) res.json({ msg: `No se a podido agregar el producto ${idProd} al carrito ${idCart}` });
        else res.json(newProductToCart);
    } catch (error) {
        next(error.message);
    };
};

export const removeProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const deletedProductFromCart = await service.removeProductToCart(
            idCart,
            idProd,
        );
        if (!deletedProductFromCart) res.json({ msg: `A ocurrido un error al intentar eliminar el producto ${idProd}` });
        else res.json({ msg: `El producto ${idProd} fue eliminado correctamente` });
    } catch (error) {
        next(error.message);
    };
};

export const updateQuantityOfProductsInCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const { quantity } = req.body;
        const updateQuantity = await service.updateQuantityOfProductsInCart(idCart, idProd, quantity);
        if (!updateQuantity) res.json({ msg: `Ocurrio un error al actualizar las cantidades del producto ${idProd}`});
        else res.json(updateQuantity);
    } catch (error) {
        next(error.message);
    };
};