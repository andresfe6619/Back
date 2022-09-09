
import  {Router} from "express";
const router = new Router();
//import {getAllFromCarro, newProduct,  addProductById, deleteById, deleteByIdCart, saveCart} from "./controllers/carroController.js";
import checkAdmin from "../middlewares/chekAdmin.js";
import { getAllFromCarro, addProductById, deleteById, deleteByIdCart, saveCart } from "../Controllers/route-controller-dao/CartController.js";
const ADMIN= true

const checking = checkAdmin(ADMIN)


router.get("/nuevoCarro", saveCart)
//router.post("/agregar",checking, newProduct)
router.get("/:id/Listado" , getAllFromCarro)
router.post('/agregar/:id',checking, addProductById) 
router.delete('/:id',checking, deleteById)
router.delete("/:id/Listado/:id_prod",checking, deleteByIdCart)

export default  router;