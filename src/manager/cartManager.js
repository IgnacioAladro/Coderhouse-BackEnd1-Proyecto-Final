import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';



export class CartManager {
    constructor() {
        this.path = './src/manager/cart.json';
        this.carts = [];
    };

    getCarts = async () => {
        const cart = await fs.readFile(this.path, 'UTF8');
        const cartParseado = JSON.parse(cart)
        return cartParseado;
    };

    getCartProducts = async (id) => {
        const allCarts = await this.getCarts();
        const cart = allCarts.find(cart => cart.id === id);
        if (cart) return cart.products
        else console.log('No se a encontrado el carrito que buscas');
    };

    newCart = async () => {
        const id = uuidv4();
        const newCart = {
            id,
            products: []
        };
        this.carts = await this.getCarts();
        this.carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(this.carts));
        return newCart;
    };

    addProduct = async (id, productId) => {
        const allCarts = await this.getCarts();
        const i = allCarts.findIndex(cart => cart.id === id);
        if (i >= 0) {
            const productsOnCart = await this.getCartProducts(id);
            const existProductI = productsOnCart.findIndex(product => product.productId === productId)
            if (existProductI !== -1) {
                productsOnCart[existProductI].quantity = productsOnCart[existProductI].quantity + 1;
            } else {
                productsOnCart.push({ productId, quantity : 1 })
            };
            allCarts[i].products = productsOnCart;
            await fs.writeFile(this.path, JSON.stringify(allCarts));
            console.log('Se a agregado el producto');
        } else console.log('No se a encontrado el carrito');
    };
};