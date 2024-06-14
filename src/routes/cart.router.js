import { Router } from "express";
const router = Router();

import * as controller from "../controllers/cart.controllers.js";



router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.delete("/:idCart", controller.clearCart);

router.put("/:id", controller.update);

router.post("/:idCart/products/:idProd", controller.addProductToCart);

router.delete("/:idCart/products/:idProd", controller.removeProductToCart);

router.put("/:idCart/products/:idProd", controller.updateQuantityOfProductsInCart);



export default router;