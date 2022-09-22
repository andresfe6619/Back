import { CarroDao } from "../../Models/Daos/indexDao.js";
import {logger} from "../../logs/loggers.js";
import {filterId} from "./productController.js"
import { ProductDao } from "../../Models/Daos/indexDao.js";
const saveCart = async (req, res) => {
    try {
        const resultado = await CarroDao.saveCartCont();
        logger.info("id del carrito"+ resultado)
        return resultado
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer crear un nuevo CarroDao', error);
        res.sendStatus(500);
    }
}
const deleteById = async (req, res) => {
    try {
        let resultado = await CarroDao.deleteById(req.params.id);
        if (!resultado){
           logger.warn("El iddel carrito no existe")
            res.send("El id de CarroDao no existe");
        } else {
            logger.info("El carrito ha sido eliminado")
            res.sendStatus("el carrito ha sido eliminado");
        }
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer eliminar el CarroDao', error)
        res.sendStatus(500);
    }
}
const getAllFromCarro = async (req, res) => {
    try {
        const id = req.user.UserCart
        let resultado = await CarroDao.getById(id);
        logger.info(resultado.productos.title)
        let productos = JSON.stringify(resultado.productos)
        res.render("carrito",{Carro : resultado.id, Productos : productos, Carrito: true  } );
    
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer obtener los productos del CarroDao', error);
        res.sendStatus(500);
    }
}
const addProductById = async (req, res) => {
    try {
        
        const id = req.user.UserCart
        const product = await ProductDao.getById(req.body.IdProd);
        
        let resultado = await CarroDao.saveInCart(id, product);
        logger.info(resultado)
        res.redirect("/Listado")
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer agregar productos al CarroDao', error);
        res.sendStatus(500);
    }
}
const adding = async (req, res) => {
    res.render("insertId")
}


const deleteByIdCart = async (req, res) => {
    try {
        let resultado = await CarroDao.eraseFromCart(req.params.id, req.params.id_prod);
        logger.info(resultado);
        res.send(resultado);
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer eliminar el producto del carrito', error);
        res.sendStatus(500);
    }
}

 export { getAllFromCarro, addProductById, deleteById, deleteByIdCart, saveCart, adding }
