import ContenedorMongo from "./mongoContenedor.js";
let instance
class CartMongo extends ContenedorMongo{
   constructor () {
         super("carritos", {
            timestamp: { type: String, required: true},
            productos: { type: Array, required: true },
        })
   }

   static getInstance(){
      if (!instance) {
          instance= new CartMongo();
      
      }
      return instance ;


}}

export default CartMongo;