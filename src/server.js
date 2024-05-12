import express from "express";
const app = express();
app.use(express.json());

import { ProductManager } from "./manager/productManager.js";
export const productManager = new ProductManager;

import { productsRouter } from "./routes/products.router.js";

app.use('/products', productsRouter);





app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server OK --> port ${PORT}`));