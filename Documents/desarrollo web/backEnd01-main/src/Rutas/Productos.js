import { Router } from "express";
const router = new Router();
import {
  showAll,
  newProduct,
  filterId,
  updateById,
  deleteById,
} from "../Controllers/route-controller-dao/productController.js";
import test from "../Controllers/productsFaker.js";
import checkAdmin from "../middlewares/chekAdmin.js";
import { graphqlHTTP } from "express-graphql";
import productSchema from "../graphql/graphl.js";
import { productGraphl } from "../Controllers/graphql.js";
const ADMIN = true;
import { checkAuthentication } from "../Controllers/users.js";
const checking = checkAdmin(ADMIN);

router.get("/Listado/:id", filterId);
router.get("/Listado", showAll);

router.use(checking);

router.post("/agregar", newProduct);
router.put("/Listado/:id", updateById);
router.delete("/Listado/:id", deleteById);
router.get("/productos-test", test);
router.use(
  "/graphql",
  graphqlHTTP({
    schema: productSchema,
    rootValue: {
      getProd: productGraphl.getProduct,
      getProds: productGraphl.getProducts,
      createProd: productGraphl.createProduct,
      updateProd: productGraphl.updateProduct,
      deleteProd: productGraphl.deleteProduct,
    },
    graphiql: true,
  })
);
router.use(checkAuthentication);
export default router;
