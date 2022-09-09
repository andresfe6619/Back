import  Contenedor from './carroModelo.js'

const Objeto5 = new Contenedor([]);
import {logger} from "./logs/loggers.js"
import fs   from 'fs/promises';
import { timeStamp }  from 'console';


const saveCart = async(req, res)=>{
    
    const {products} = req.body;
    const newCart = {
        products
    }
    try{
        await Objeto5.saveCartCont(newCart)
        logger.info(newCart)
        res.json(newCart)
    }catch(error){
        logger.error(error)
    }
}

const showAll = async(req, res) => { 
try {
   
 
        const prods = await Objeto5.getAll()
        //handlebars
        if (prods.length == 0) {
            res.render("products", {prods, });
        } else{
        res.render("product", {prods, hasAny: true});
        }
        
   
    } catch (error) {
        const prods = await Objeto5.getAll()
        //Handlebars
        res.render("products", {prods, hasAny: false});
      
    
    
    }
};

 

const newProduct= (req, res) => {
    try {
        const {products} = req.body;
        let newCart = {products};
        Objeto5.saveObject(newCart);
        logger.info(`el carrito  ha sido creado`)
        res.send(`el carrito  ha sido creado`);
    } catch (error) {
        logger.error(error);
    }
};


const filterId= async(req, res) => {
     try {
         const {id} = req.params;
         const product = await Objeto5.getById(id);
         logger.info(product)
         res.json(product)
     } catch (error) {
       
        logger.error(error)
     }
     
 };

 const getAllFromCarro= async(req, res) => {
    try {
        const prods = await Objeto5.getAll()
        const {id} = req.params;
        const product = await Objeto5.getById(id);
        logger.info(prods)
        res.json(prods)
    } catch (error) {
        logger.error(error)
    }
    }

 
const updateById= async(req, res) => {
     try {
        const {id} = req.params;
        const newProd = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            
        }
        await Objeto5.updateById(id, newProd);
        res.json(newProd);
     } catch (error) {
         console.log(error);
     }
    
}

const deleteById= async(req, res) => {
    try {
        const {id} = req.params;
        await Objeto5.deleteById(id);
        logger.warn(`El carrito con id ${id} ha sido eliminado`)
        res.json(`El carrito con id ${id} ha sido eliminado`);
    }catch (error) {
       logger.error(error)
        res.json(`No se encontró el id ${id}`, error.message);
    }

}
const addProductById= async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Objeto5.addFromdb(id);
        const cart = await Objeto5.addProductFrom();
        const add = await Objeto5.addProductInto(cart, product);
        logger.info(product)
        res.json(product);
    } catch (error) {
        logger.error(error);
    }
}
const deleteByIdCart = async(req, res) => { 
    const {id, id_prod} = req.params;
        
    try {
        const erase= await Objeto5.erase(id);
        
        const cart =[]
        cart.push(erase.productos)
       
        // const prod = cart.find(prod => prod.id === Number(id_prod))
        // console.log(prod)
        // const result = cart.filter(item => item != prod)
        const result = cart.filter(item => item.id != Number(id_prod))
        await Objeto5.addProductInto(erase, result)
        logger.warn(`El producto con el id ${id_prod} ha sido eliminado`)
        res.send(`El producto con el id ${id_prod} ha sido eliminado`);
    } catch (error) {
        logger.error(error);

    }
}



 export { getAllFromCarro, newProduct, filterId, addProductById, deleteById, deleteByIdCart, saveCart };