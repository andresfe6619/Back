import { CartService } from "../../services/cart.service.js";
import { logger } from "../../logs/loggers.js";
import { sendGmail, sendWpp } from "../../services/Gmail-Wpp.js";
import { productService } from "../../services/Product.service.js";

const saveCart = async (req, res) => {
  try {
    const resultado = await CartService.saveCart();
    logger.info("id del carrito" + resultado);
    res.send(resultado);
  } catch (error) {
    logger.error(
      "Ocurrio el siguiente error al querer crear un nuevo CartService",
      error
    );
    res.sendStatus(500);
  }
};
const deleteById = async (req, res) => {
  try {
    let resultado = await CartService.deleteById(req.params.id);
    if (!resultado) {
      logger.warn("El iddel carrito no existe");
      res.redirect("api/users/inicio")
    } else {
      logger.info("El carrito ha sido eliminado");
      res.render("eliminar",{Mensaje : "Carrito Eliminado"});
    }
  } catch (error) {
    logger.error(
      "Ocurrio el siguiente error al querer eliminar el CartService",
      error
    );
    res.sendStatus(500);
  }
};

let pedido;

const getAllFromCarro = async (req, res) => {
  try {
    const id = req.user.UserCart;
    const prods = await CartService.getById(id);
   
    pedido = JSON.stringify(prods); 
    if ((prods.length != 0)) {
        
      res.render("carro",{prods ,Carro: id, hasAny: true  } );
    } else {
      res.render("carro", {hasAny: false })
   
    }
  } catch (error) {
    logger.error(
      "Ocurrio el siguiente error al querer obtener los productos del CartService",
      error
    );
    res.sendStatus(500);
  }
};
//De aqui sale el correo con el pedido
const order = async (req, res) => {
 res.redirect("terminar")

  try {
    var user = req.user.UserCart
     await CartService.eraseFromCart(
      user,
      "erase"
    );
    const body = `Hola, tienes un nuevo pedido del carrito con id : ${req.user.UserCart} y el pedido es:${pedido}`
   

  
    if (req.user.phone === process.env.TO) {
      await sendWpp(body, req.user.phone);
      logger.warn(
        "El numero proporcionado no es el numero registrado +573193129782"
      );
    } else {
      logger.info("enviando mensaje");
      await sendWpp(body, process.env.TO);
    }
   
    await sendGmail(
      "Nuevo pedido",
      `<div>Nombre de usuario : ${req.user.username}</div>
<div>email : ${req.user.email}</div>
<div>telefono : ${req.user.phone}</div>
<div> Id del carro : ${req.user.UserCart}</div>
<div>Direccion : ${req.user.Direction}</div>
<div> Pedido(s):${pedido} </div>
`
    );
  } catch (error) {
    logger.error(error);
  }
};
//Aqui se reenderiza la pagina de terminar compra
const terminarCompra = async (req, res) => {

  res.render("terminar")
};

const addProductById = async (req, res) => {
  try {
    const id = req.user.UserCart;
    const product = await productService.getById(req.body);
    let resultado = await CartService.saveInCart(id, product);
    logger.info(resultado);
    res.redirect("/api/carro/Listado");
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer agregar productos al CartService",
      error
    );
    res.sendStatus("error");
  }
};


const deleteByIdCart = async (req, res) => {
  var user = req.user.UserCart
  try {
    let resultado = await CartService.eraseFromCart(
      user,
      req.body
    );

    logger.info(resultado);
    res.redirect("Listado")
  } catch (error) {
    logger.error(
      "Ocurrio el siguiente error al querer eliminar el producto del carrito",
      error
    );
    res.sendStatus(500);
  }
};
const adding = async (req, res) => {
  
  res.render("insertId")

};
const deleting= async (req, res) => {
  
  res.render("delete")

};
const emptyCart = async (req, res) => {
  var user = req.user.UserCart
  try {
    let resultado = await CartService.eraseFromCart(
      user,
      "erase"
    );

    logger.info(resultado);
    res.redirect("Listado")
  } catch (error) {
    logger.error(
      "Ocurrio el siguiente error al querer vaciar el carrito",
      error
    );
    res.sendStatus(500);
  }}
export {
  getAllFromCarro,
  addProductById,
  saveCart,
  deleteById,
  deleteByIdCart,
  adding,
  order,
  terminarCompra,
  deleting,
  emptyCart
};
