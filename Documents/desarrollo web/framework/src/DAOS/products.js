import Repository from "./repository.js";
let instance
class  productDAO extends Repository {
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
          instance= new productDao();
      
      }
      return instance ;

  
}

}

export default productDAO;