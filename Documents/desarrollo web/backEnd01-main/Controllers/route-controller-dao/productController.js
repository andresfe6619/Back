import { productService } from "../../services/Product.service.js";
import bodyParser from "body-parser";
import { Router } from "express";
import { logger } from "../../logs/loggers.js";

const router = new Router();
const showAll = async (req, res) => {
  try {
    const prods = await productService.getAll();

    logger.info(prods);
    res.send(prods);
    // res.render("products", {prods , hasAny :true})
  } catch (error) {
    const prods = await productService.getAll();
    logger.error(error);
    res.send(error);
    //res.render("products", { hasAny : false})
  }
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const newProduct = async (req, res) => {
  try {
    const proof = await productService.saveObject(req.body);
    logger.info("product saved");
    res.send(proof);
    // res.redirect("/api/productos/Listado");
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

const filterId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    logger.info(product);
    res.json(product);
  } catch (error) {
    logger.error(error);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const newProd = req.body;
    await productService.updateById(id, newProd);
    logger.info(newProd);
    res.json(newProd);
  } catch (error) {
    logger.error(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const proof = await productService.deleteById(id);
    logger.info(`El producto con id ${id} ha sido eliminado`);
    res.send(proof);
    //res.json(`El producto con id ${id} ha sido eliminado`);
  } catch (error) {
    logger.error(`No se encontró el id `, error.message);
  }
};

export { showAll, newProduct, filterId, updateById, deleteById };
