import { CartModel } from "./models/cart.model.js";



export default class CartDaoMongoDB {
    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
        };
    };

    async create() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log(error);
        };
    };

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        };
    };

    async existProductInCart(cartId, prodId) {
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } }
            });
        } catch (error) {
            console.log(error);
        };
    };

    async addProdToCart(cartId, prodId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) return null;
            const productInCart = cart.products.findIndex(product => product.product.toString() === prodId);
            if (productInCart !== -1) {
                cart.products[productInCart].quantity = quantity;
            } else return await CartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: { product: prodId, quantity } } },
                { new: true }
            );
            return cart;
        } catch (error) {
            console.log(error);
        };
    };

    async removeProdToCart(cartId, prodId) {
        try {
            return await CartModel.findByIdAndUpdate(
                { _id: cartId },
                { $pull: { products: { product: prodId } } },
                { new: true }
            )
        } catch (error) {
            console.log(error);
        };
    };

    async update(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        };
    };
};