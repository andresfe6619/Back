import { Router } from "express";
import {
  showAll,
  newProduct,
  filterId,
  updateById,
  deleteById,
} from "../Controllers/route-controller-dao/productController.js";
import checkAdmin from "../middlewares/chekAdmin.js";
import { graphqlHTTP } from "express-graphql";
import productSchema from "../graphql/graphl.js";
import { productGraphl } from "../Controllers/graphql.js";
import { checkAuthentication } from "../Controllers/route-controller-dao/users.js"

const router = new Router();

router.get("/Listado", showAll);
router.get("/Listado/:_id", filterId);
router.use(checkAuthentication);
router.use(checkAdmin);
router.post("/agregar", newProduct);
router.put("/Listado/:id", updateById);
router.delete("/Listado/:id", deleteById);
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

export default router;
