import { ProductDao } from "../../Models/Daos/indexDao.js";
import bodyParser from 'body-parser';
import {Router} from 'express';
import {logger} from "../../logs/loggers.js" 
const router = new Router();
const showAll = async(req, res) => { 
    try {
       
     
            const prods = await ProductDao.getAll()
            logger.info(prods)
            res.json(prods);
            // if (prods.length == 0) {
            //     res.render("products", {prods, });
            // } else{
            // res.render("products", {prods, hasAny: true});
            // }
            
       
        } catch (error) {
            const prods = await ProductDao.getAll()
            logger.error(error)
            res.json(prods);
            //res.render("products", {prods, hasAny: false});
          
        
        
        }
    };
    
     router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({ extended: true }));
    
    const newProduct= (req, res) => {
        try {
    
           ProductDao.saveObject(req.body);
          logger.info("product saved")
            res.redirect("/api/productos/Listado");
        } catch (error) {
            logger.error(error);
        }
    };
    
    
    const filterId= async(req, res) => {
         try {
             const {id} = req.params;
             const product = await ProductDao.getById(id);
             logger.info(product)
             res.json(product)
         } catch (error) {
           
            logger.error(error)
         }
         
     };
    
     
    const updateById= async(req, res) => {
         try {
            const {id} = req.params;
            const newProd = req.body;
            await ProductDao.updateById(id, newProd);
            logger.info(newProd)
            res.json(newProd);
         } catch (error) {
             logger.error(error);
         }
        
    }
    
    const deleteById= async(req, res) => {
        try {
            const {id} = req.params;
            await ProductDao.deleteById(id);
            logger.info(`El producto con id ${id} ha sido eliminado`)
            res.json(`El producto con id ${id} ha sido eliminado`);
        }catch (error) {
            logger.error(`No se encontró el id ${id}`, error.message)
            res.json(`No se encontró el id ${id}`, error.message);
        }
    }
     
     export  { showAll, newProduct, filterId, updateById, deleteById };