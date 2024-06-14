import { Router } from "express";
const router = Router();

import * as controller from "../controllers/cart.controllers.js";



router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.delete("/:id", controller.remove);

router.post("/:idCart/products/:idProd", controller.addProdToCart);

router.delete("/:idCart/products/:idProd", controller.removeProdToCart);

router.put("/:id", controller.update);



export default router;