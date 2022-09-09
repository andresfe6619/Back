import ContenedorMongo from "./mongoContenedor.js";

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
}

export default contenedorProds;