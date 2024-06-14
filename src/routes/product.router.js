import { Router } from "express";
const router = Router();

import * as controller from "../controllers/product.controllers.js";



router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);



export default router;