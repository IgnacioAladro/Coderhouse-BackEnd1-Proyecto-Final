import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor () {
        this.path = 'products.json';
        this.products = [];
    };

    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const id = uuidv4();
        let newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        };
        this.products = await this.getProducts();
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products));
        return newProduct;
    };

    getProducts = async () => {
        const products = await fs.readFile(this.path, 'UTF8');
        const productsParseado = JSON.parse(products);

        return productsParseado;
    };

    getProductById = async (id) => {
        const products = await this.getProducts();
        const productExist = products.find(product => product.id == id);
        if (productExist) return productExist
        else console.log('No se encontro el producto que busca');
        /*         
        if (product) {
            return product;
        } else {
            console.log('NO se a encontrado el producto');
        }; 
        */
    };

    updateProduct = async (id, {...data}) => {
        const products = await this.getProducts();
        const i = products.findIndex(product => product.id == id);
        if (i >= 0) {
            products[i] = {...products[i],...data};
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[i];
        } else {
            console.log('No se encontro el producto que desea actualizar');
        };
    };

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const i = products.findIndex(product => product.id == id);
        if (i >= 0) {
            products.splice(i, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
            return products;
        } else {
            console.log('No se encontro el producto que desea eliminar');
        };
    };
};