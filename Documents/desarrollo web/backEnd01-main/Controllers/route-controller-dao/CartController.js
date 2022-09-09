import { CarroDao } from "../../Models/Daos/indexDao.js";
import {logger} from "../../logs/loggers.js";

const saveCart = async (req, res) => {
    try {
        const resultado = await CarroDao.saveCartCont();
        logger.info("id del carrito"+ resultado)
        res.send(`id del carrito ${resultado}`);
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
        let resultado = await CarroDao.getById(req.params.id);
        logger.info(resultado)
        res.send(resultado);
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer obtener los productos del CarroDao', error);
        res.sendStatus(500);
    }
}
const addProductById = async (req, res) => {
    try {

        let resultado = await CarroDao.saveInCart(req.params.id, req.body);
        logger.info(resultado)
        res.send(resultado)
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer agregar productos al CarroDao', error);
        res.sendStatus(500);
    }
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

 export { getAllFromCarro, addProductById, deleteById, deleteByIdCart, saveCart }
