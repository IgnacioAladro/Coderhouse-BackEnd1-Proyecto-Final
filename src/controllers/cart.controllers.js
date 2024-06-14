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
        if (!response) res.status(404).json({ msg: "Cart Not found!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    };
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (!newCart) res.status(404).json({ msg: "Error create cart!" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    };
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDel = await service.remove(id);
        if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
        else res.status(200).json({ msg: `Cart id: ${id} deleted` });
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
        const cartUpd = await service.update(id, req.body);
        if (!cartUpd) res.status(400).json({ msg: "Error update cart!" });
        else res.status(200).json(cartUpd);
    } catch (error) {
        next(error.message);
    };
};

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newProdToUserCart = await service.addProductToCart(
            idCart,
            idProd,
        );
        if (!newProdToUserCart) res.json({ msg: "Error add product to cart" });
        else res.json(newProdToUserCart);
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
        if (!deletedProductFromCart) res.json({ msg: "Error remove product to cart" });
        else res.json({ msg: `product ${idProd} deleted to cart` });
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