import { Router } from "express";
import checkAdmin from "../middlewares/chekAdmin.js";
import {
  getAllFromCarro,
  addProductById,
  deleteById,
  deleteByIdCart,
  adding,
  order,
  terminarCompra,
  deleting
} from "../Controllers/route-controller-dao/CartController.js";
import { checkAuthentication } from "../Controllers/route-controller-dao/users.js";

const router = new Router();

router.use(checkAuthentication);
router.get("/Listado", getAllFromCarro);
router.get("/agregar", adding).post("/agregar", addProductById);
router.get("/terminar", terminarCompra).post("/terminar", order);
router.get("/eliminar",  deleting).post("/eliminar", deleteByIdCart);
router.delete("/:id", checkAdmin, deleteById);


export default router;
