import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();



export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        return await cartDao.getById(id);
    } catch (error) {
        console.log(error);
    }
};

export const create = async () => {
    try {
        const newcart = await cartDao.create();
        if (!newcart) return false;
        else return newcart;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const cartDel = await cartDao.delete(id);
        if (!cartDel) return false;
        else return cartDel;
    } catch (error) {
        console.log(error);
    };
};

export const addProdToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        const existProduct = await prodDao.getById(prodId);
        if (!existProduct) return null;
        const productInCart = await cartDao.existProductInCart(cartId, prodId);
        if (productInCart) {
            const quantity = productInCart.products.find(product => product.product.toString() === prodId).quantity + 1;
            return await cartDao.addProdToCart(cartId, prodId, quantity)
        };
        return await cartDao.addProdToCart(cartId, prodId);
    } catch (error) {
        console.log(error);
    };
};

export const removeProdToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        const existProductInCart = await cartDao.existProductInCart(cartId, prodId);
        if (!existProductInCart) return null;
        return await cartDao.removeProdToCart(cartId, prodId);
    } catch (error) {
        console.log(error);
    };
};

export const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj);
    } catch (error) {
        console.log(error);
    };
};