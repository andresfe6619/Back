
import  {Router} from "express";
const router = new Router();
//import {getAllFromCarro, newProduct,  addProductById, deleteById, deleteByIdCart, saveCart} from "./controllers/carroController.js";
import checkAdmin from "../middlewares/chekAdmin.js";
import { getAllFromCarro, addProductById, deleteById, deleteByIdCart, saveCart, adding, order, terminarCompra } from "../Controllers/route-controller-dao/CartController.js";
import  { checkAuthentication} from "../Controllers/users.js";
const ADMIN= true

const checking = checkAdmin(ADMIN)


//router.get("/nuevoCarro", saveCart)
//router.post("/agregar",checking, newProduct)

router.use(checkAuthentication)
router.get("/Listado" , getAllFromCarro)
router.get('/agregar', adding).post("/agregar", addProductById) 
router.get("/terminar", terminarCompra).post("/terminar", order)

router.delete('/:id',checking, deleteById)
router.delete("/:id/Listado/:id_prod",checking, deleteByIdCart)

export default  router;