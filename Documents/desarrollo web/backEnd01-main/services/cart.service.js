import {CarroDao} from "../Models/Daos/indexDao.js"

const getAll = async () => {
    const data = await CarroDao.getAll();
 
    return data;
}
const getById = async (cart) => {
    const data = await CarroDao.getById(cart);
    const result = await data.productos.map(product =>  {       
        return{ 
           title : product.title,
           price : product.price, 
           thumbnail:product.thumbnail,
           descrip : product.descrip,
           stock :product.stock,
           codigo : product.codigo,
           
   
        }                    
       }
       )
    return result
}
const saveCart = async (date) => {
    const nuevoCarrito = { timestamp: date, productos: []};
    const newCart = await CarroDao.saveCartCont(nuevoCarrito) 
    console.log(date)
    return newCart
}
const deleteById = async (IdToDelete) => {
    const Deleted12 = await CarroDao.deleteById(IdToDelete)
    return Deleted12
}

const saveInCart = async (idCart, product) => {
    
    let cart = await CarroDao.getById(idCart)
    let resultado;
    if ( cart ){
     //elemento._id  = tempCart.productos.length + 1;   
        cart.productos.push( product);
        await CarroDao.updateById(idCart, cart);
        resultado = `Producto : ${product.title},  ha sido añadido correctamente al cart con ID ${idCart}`;
    } else {
        resultado = "El id de carrito no existe";
    }
    return resultado
}
 

const eraseFromCart = async (idCart, idProduct) =>{

  let resultado;
        let tempCart = await CarroDao.getById(idCart);
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
