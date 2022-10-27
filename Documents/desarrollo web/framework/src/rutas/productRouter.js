import Router from "koa-router"
import  {showAll, newProduct, filterId, updateById, deleteById } from "../controllers/productController.js"

const router = new Router({
    prefix:"/products"
})
router.get("/", showAll)
router.get("/:id", filterId)
router.post("/New", newProduct)
router.put("/:id", updateById)
router.delete("/:id", deleteById)

export default router