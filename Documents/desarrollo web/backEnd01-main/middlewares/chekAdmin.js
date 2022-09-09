import  {Router} from "express";
import {logger} from "../logs/loggers.js"
const router = new Router();

const checkAdmin = (admin)=>{
 
      return  ((req,res,next)=>{
       if (admin === true){
        logger.info("admin is true")   
        next();
        } else{
            logger.warn({error: -1, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`})
            res.json({error: -1, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`})
        }
    })
}



export default checkAdmin;
