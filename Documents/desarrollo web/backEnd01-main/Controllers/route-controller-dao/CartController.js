import { CartService } from "../../services/cart.service.js";
import {logger} from "../../logs/loggers.js";
import {sendGmail, sendWpp} from "../../services/Gmail-Wpp.js";
import { productService } from "../../services/Product.service.js";
const saveCart = async (req, res) => {
    try {
        const resultado = await CartService.saveCart();
        logger.info("id del carrito"+ resultado)
        return resultado
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer crear un nuevo CartService', error);
        res.sendStatus(500);
    }
}
const deleteById = async (req, res) => {
    try {
        let resultado = await CartService.deleteById(req.params.id);
        if (!resultado){
           logger.warn("El iddel carrito no existe")
            res.send("El id de CartService no existe");
        } else {
            logger.info("El carrito ha sido eliminado")
            res.sendStatus("el carrito ha sido eliminado");
        }
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer eliminar el CartService', error)
        res.sendStatus(500);
    }
}
const ArrayPedidos=[]

const getAllFromCarro = async (req, res) => {
    try {
        const id = req.user.UserCart
        let resultado = await CartService.getById(id);
        let productos = resultado.productos
        let prueba = resultado.productos[0].title
        let precio = resultado.productos[0].price
        let idP = resultado.productos[0]._id
        let pedido = {title: prueba, price: precio, id : idP}
        if (productos.length = 0){
         res.render("carrito")

        }else{
        //let productos = JSON.stringify(resultado.productos)       
        ArrayPedidos.push(prueba)
        res.render("carro",{Carro : resultado.id, Productos : prueba, Carrito: true  } );
        // const  Pedido = document.querySelector("#Pedido") 
        // function submitHandler (e) {
        //     e.preventDefault()
        //     console.log("button is working")
        
        // }
        // Pedido.addEventListener("submit", submitHandler)
        // }
        }

    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer obtener los productos del CartService', error);
        res.sendStatus(500);
    }
}


const order = async (req, res) => {



res.redirect("/api/users/home")


try {
  const body = `Hola, tienes un nuevo pedido del carrito con id : ${req.user.UserCart} y el pedido es: ${ArrayPedidos}`
if (req.user.phone === process.env.TO){

const wpp = await sendWpp(body, req.user.phone)  
logger.warn("El numero proporcionado no es el numero registrado +573193129782")} 
else{
   logger.info("enviando mensaje")
    const wpp = await sendWpp(body, process.env.TO) 
}

sendGmail("Nuevo pedido",`<div>Nombre de usuario : ${req.user.username}</div>
<div>email : ${req.user.email}</div>
<div>telefono : ${req.user.phone}</div>
<div> Id del carro : ${req.user.UserCart}</div>
<div>Direccion : ${req.user.Direction}</div>
<div> Pedido(s):${ArrayPedidos} </div>
`  )
}catch(error){
    logger.error(error)
}

}


const terminarCompra = async (req, res) =>{

res.render("terminar")

}



const addProductById = async (req, res) => {
    try {
        
        const id = req.user.UserCart
        const product = await productService.getById(req.body.IdProd);
        
        let resultado = await CartService.saveInCart(id, product);
        logger.info(resultado)
        res.redirect("/api/carro/Listado")
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer agregar productos al CartService', error);
        res.sendStatus(500);
    }
}
const adding = async (req, res) => {
    res.render("insertId")
}


const deleteByIdCart = async (req, res) => {
    try {
        let resultado = await CartService.eraseFromCart(req.params.id, req.params.id_prod);
        logger.info(resultado);
        res.send(resultado);
    } catch (error) {
        logger.error('Ocurrio el siguiente error al querer eliminar el producto del carrito', error);
        res.sendStatus(500);
    }
}

 export { getAllFromCarro, addProductById, saveCart, deleteById, deleteByIdCart, adding, order, terminarCompra }
