import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productsDao = new ProductDaoMongoDB();



export const getAll = async (page, limit, price, sort) => {
    try {
        return await productsDao.getAll(page, limit, price, sort);
    } catch (error) {
        console.log(error);
    };
};

export const getById = async (id) => {
    try {
        const productById = await productsDao.getById(id);
        if (!productById) return false;
        else return productById;
    } catch (error) {
        console.log(error);
    };
};

export const create = async (obj) => {
    try {
        const newProduct = await productsDao.create(obj);
        if (!newProduct) return false;
        else return newProduct;
    } catch (error) {
        console.log(error);
    };
};

export const update = async (id, obj) => {
    try {
        const productUpdated = await productsDao.update(id, obj);
        if (!productUpdated) return false;
        else return productUpdated;
    } catch (error) {
        console.log(error);
    };
};

export const remove = async (id) => {
    try {
        const productRemoved = await productsDao.delete(id);
        if (!productRemoved) return false;
        else return productRemoved;
    } catch (error) {
        console.log(error);
    };
};