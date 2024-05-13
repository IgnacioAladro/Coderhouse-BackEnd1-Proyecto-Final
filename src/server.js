import express from "express";
const app = express();
app.use(express.json());

import { ProductManager } from "./manager/productManager.js";
export const productManager = new ProductManager;
import { productsRouter } from "./routes/products.router.js";

import { CartManager } from "./manager/cartManager.js";
export const cartManager = new CartManager;



app.use('/api/products', productsRouter);
app.use('/api/carts', );



const PORT = 8080;
app.listen(PORT, () => console.log(`Server OK --> port ${PORT}`));