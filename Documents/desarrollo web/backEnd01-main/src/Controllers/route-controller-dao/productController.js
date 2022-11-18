import { productService } from "../../services/Product.service.js";
import bodyParser from "body-parser";
import { Router } from "express";
import { logger } from "../../logs/loggers.js";

const router = new Router();

const showAll = async (req, res) => {
  try {
    const prods = await productService.getAll();
    logger.info(prods);

     res.render("products", {prods , hasAny :true})
  } catch (error) {
    const prods = await productService.getAll();
    logger.error(error);
   
    res.render("products", { hasAny : false})
  }
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const newProduct = async (req, res) => {
  try {
    const proof = await productService.saveObject(req.body);
    logger.info("product saved");
    
    res.redirect("/api/productos/Listado");
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

const filterId = async (req, res) => {
// Por alguna extraña razón el producto cuando lo dejo en res.json carga normal, pero cuando le haog res.render me saca error
//del ID, pero en cuanto se reinicia por algun cambio carga la pagina con el producto correctamente (._. )  
  try {
    
    const prod = await productService.getById(req.params);
    
    //res.json(prod)
   res.render("product", {id: prod.id , title: prod.title, stock: prod.stock, colPrice: prod.colPrice, thumbnail: prod.thumbnail , hasAny :true})
  } catch (err) {
    logger.error(err);
    console.log(err)
  }
};
// como estas son funciones de admin las dejé en json por defecto, puesto que estas no pueden ser alcanzadas de forma normal
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const newProd = req.body;
    await productService.updateById(id, newProd);
    logger.info(newProd);
    res.send(newProd)
    //res.render("product", {id: id , title: prod.title, stock: prod.stock, colPrice: prod.colPrice, thumbnail: prod.thumbnail , hasAny :true});
  } catch (error) {
    logger.error(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const proof = await productService.deleteById(id);
    logger.info(`El producto con id ${id} ha sido eliminado`);
    res.send(`El producto con id ${id} ha sido eliminado`)
    //res.render("eliminar")
  } catch (error) {
    logger.error(`No se encontró el id `, error.message);
  }
};

export { showAll, newProduct, filterId, updateById, deleteById };
