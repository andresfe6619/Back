import { Router } from "express";
const router = new Router();

import checkAdmin from "../middlewares/chekAdmin.js";
import {
  getAllFromCarro,
  addProductById,
  deleteById,
  deleteByIdCart,
  saveCart,
  adding,
  order,
  terminarCompra,
} from "../Controllers/route-controller-dao/CartController.js";
import { checkAuthentication } from "../Controllers/route-controller-dao/users.js";



router.use(checkAuthentication);
router.get("/Listado", getAllFromCarro);
router.get("/agregar", adding).post("/agregar", addProductById);
router.get("/terminar", terminarCompra).post("/terminar", order);

router.delete("/:id", checkAdmin, deleteById);
router.delete("/:id/Listado/:id_prod", checkAdmin, deleteByIdCart);

export default router;
