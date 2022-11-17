import { Router } from "express";
const router = new Router();
import {
  showAll,
  newProduct,
  filterId,
  updateById,
  deleteById,
} from "../Controllers/route-controller-dao/productController.js";

import checkAdmin from "../middlewares/chekAdmin.js";



import { checkAuthentication } from "../Controllers/route-controller-dao/users.js"


router.get("/Listado", showAll);
router.get("/Listado/:id", filterId);
router.use(checkAuthentication);
router.use(checkAdmin);
router.post("/agregar", newProduct);
router.put("/Listado/:id", updateById);
router.delete("/Listado/:id", deleteById);



export default router;
