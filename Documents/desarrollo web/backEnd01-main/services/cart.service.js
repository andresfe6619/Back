import { CarroDao } from "../Models/Daos/indexDaoFactory.js";
import Cotizador from "../DTO/cotizador.js";
import productDTO from "../DTO/productDTO.js";

const cotizador = new Cotizador();
const getAll = async () => {
  const data = await CarroDao.getAll();

  return data;
};
const getById = async (cart) => {
  const data = await CarroDao.getById(cart);

  const result = await data.productos.map((product) => {
    const currencies = {
      arsPrice: cotizador.getCurrencyPrice(product.price, "ARS"),
      colPrice: cotizador.getCurrencyPrice(product.price, "COL"),
      mexPrice: cotizador.getCurrencyPrice(product.price, "MEX"),
    };
    const prods = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnai: product.thumbnail,
      stock: product.stock,
    };
    return new productDTO(prods, currencies);
  });
  return result;
};
const saveCart = async (date) => {
  const nuevoCarrito = { timestamp: date, productos: [] };
  const newCart = await CarroDao.saveCartCont(nuevoCarrito);
  console.log(date);
  return newCart;
};
const deleteById = async (IdToDelete) => {
  const Deleted12 = await CarroDao.deleteById(IdToDelete);
  return Deleted12;
};

const saveInCart = async (idCart, product) => {
  let cart = await CarroDao.getById(idCart);
  let resultado;
  if (cart) {
    //elemento._id  = tempCart.productos.length + 1;
    cart.productos.push(product);
    await CarroDao.updateById(idCart, cart);
    resultado = `Producto : ${product.title},  ha sido añadido correctamente al cart con ID ${idCart}`;
  } else {
    resultado = "El id de carrito no existe";
  }
  return resultado;
};

const eraseFromCart = async (idCart, idProduct) => {
  let resultado;
  let tempCart = await CarroDao.getById(idCart);
  if (tempCart) {
    let arrayProducts = tempCart.productos;
    let index = arrayProducts.findIndex((x) => x._id == idProduct);
    console.log("indice : ", index);
    if (index >= 0) {
      arrayProducts.splice(index, 1);
      await carroDao.eraseFromCart(idCart, arrayProducts);
      resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
    } else {
      resultado = "El carrito es correcto pero el producto no existe";
    }
  } else {
    resultado = "El carrito no existe";
  }
  return resultado;
};

export const CartService = {
  getAll,
  getById,
  saveCart,
  deleteById,
  saveInCart,
  eraseFromCart,
};
