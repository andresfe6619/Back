import ContenedorMongo from "./mongoContenedor.js";

class CartMongo extends ContenedorMongo{
   constructor () {
         super("carritos", {
            timestamp: { type: String, required: true},
            productos: { type: Array, required: true },
        })
   }
}

export default CartMongo;