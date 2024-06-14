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
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (!newCart) res.status(404).json({ msg: "Error create cart!" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDel = await service.remove(id);
        if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
        else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
        next(error.message);
    }
};

export const addProdToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newProdToUserCart = await service.addProdToCart(
            idCart,
            idProd,
        );
        if (!newProdToUserCart) res.json({ msg: "Error add product to cart" });
        else res.json(newProdToUserCart);
    } catch (error) {
        next(error.message);
    }
};

export const removeProdToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const delProdToUserCart = await service.removeProdToCart(
            idCart,
            idProd,
        );
        if (!delProdToUserCart) res.json({ msg: "Error remove product to cart" });
        else res.json({ msg: `product ${idProd} deleted to cart` });
    } catch (error) {
        next(error.message);
    }
};