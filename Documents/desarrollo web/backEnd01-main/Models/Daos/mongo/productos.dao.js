import ContenedorMongo from "./mongoContenedor.js";
let instance
class contenedorProds extends ContenedorMongo{
   constructor () {
         super("Productos", {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            descrip: { type: String, required: true },          
            stock: { type: Number, required: true },                  
            codigo: { type: String, required: true },
         })
   }
   static getInstance(){
      if (!instance) {
          instance= new contenedorProds();
      
      }
      return instance ;
   }


}

export default contenedorProds;