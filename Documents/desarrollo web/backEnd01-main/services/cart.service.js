import {carroDao} from "../Models/Daos/indexDao"

const getAll = async () => {
    const data = await carroDao.getAll();

    return data;
}
const getById = async (cart) => {
    const result = carroDao.getById(cart);

    return result


}
const saveCart = async () => {
    const nuevoCarrito = { timestamp: "", productos: []};
    const newCart = carroDao.saveCartCont(nuevoCarrito) 
    return newCart
}
const deleteById = async (IdToDelete) => {
    const Deleted12 = await carroDao.deleteById(IdToDelete)
    return Deleted12
}

const saveInCart = async (idCart, product) => {
    
    let cart = await carroDao.getById(idCart)
    let resultado;
    if ( cart ){
     //elemento._id  = tempCart.productos.length + 1;   
        tempCart.productos.push( elemento);
        await carroDao.updateById(idCart, cart);
        resultado = `Producto : ${product.title},  ha sido añadido correctamente al cart con ID ${idCart}`;
    } else {
        resultado = "El id de carrito no existe";
    }
    return resultado
}
 

const eraseFromCart = async (idCart, idProduct) =>{

  let resultado;
        let tempCart = await carroDao.getById(idCart);
        if (tempCart){
            let arrayProducts = tempCart.productos;
            let index = arrayProducts.findIndex(x => x._id == idProduct);
              console.log ("indice : ", index)
            if (index >= 0) {
                 arrayProducts.splice(index, 1);
                 await carroDao.eraseFromCart(idCart, arrayProducts);
                 resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
             } else {
                 resultado = "El carrito es correcto pero el producto no existe";
             }
         } else {
             resultado = "El carrito no existe"
         }
     return resultado;
    }








export const CartService = {
getAll, 
getById, 
saveCart,
deleteById,
saveInCart,
eraseFromCart
}
