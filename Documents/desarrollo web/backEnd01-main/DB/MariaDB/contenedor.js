// contenedor principal de productos 
import Contenedor from "./contenedorMaria.js";
const  contenedorProductos = new Contenedor("productos");
import {logger} from "../../logs/loggers.js"

const getAllProducts = (req, res)=>{
   try{
    res.json(contenedorProductos.getAll());
   logger.info("trayendo productos")
}catch (err) {
  logger.error("error trayendo productos"+ err)
   }
}

const getProductById = (req, res)=>{
  try{  
    res.json(contenedorProductos.getById(Number(req.params.id)));
 logger.info ("buscando por id")
}catch (err) {
  logger.error("error trayendo por id "+  id)
  }

}

const postProduct = (req, res)=>{
try{    
    res.json(contenedorProductos.save(req.body))
logger.info("posting product")
}catch(err){
logger.error("error postin product"+ err) 
}
}

const putProduct = (req, res)=>{
 try{   
    res.json(contenedorProductos.saveById(Number(req.params.id), req.body));
 logger.info("puting product")
} catch (err){
    logger.error("error putting product"+ err)
 }
}

const deleteProductById = (req, res)=>{
  try {
    res.json(contenedorProductos.deleteById(Number(req.params.id)));
  logger.info ("error deleting by id")
} catch (err) {
logger.error("error deleteProductById"+ err)
  }
}

export {contenedorProductos, getAllProducts, getProductById, postProduct, putProduct, deleteProductById}