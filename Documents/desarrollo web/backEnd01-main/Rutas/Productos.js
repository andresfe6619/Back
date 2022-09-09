import express  from 'express'
import {Router} from "express";
const router = new Router();
import {showAll, newProduct, filterId, updateById, deleteById}  from"../Controllers/route-controller-dao/productController.js";
import test from "../Controllers/productsFaker.js";
import checkAdmin from "../middlewares/chekAdmin.js";
const ADMIN= false

const checking = checkAdmin(ADMIN)

router.get("/Listado/:id" , filterId)
router.get ("/Listado", showAll)

router.use(checking)
router.post("/agregar",  newProduct)
router.put('/Listado/:id', updateById)
router.delete('/Listado/:id', deleteById)
router.get("/productos-test", test)

export default router;