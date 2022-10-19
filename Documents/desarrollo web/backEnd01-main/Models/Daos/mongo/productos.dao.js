import ContenedorMongo from "./mongoContenedor.js";
import {logger} from "../../../logs/loggers.js"
let instance
class contenedorProds extends ContenedorMongo{
   constructor () {
         super("Productos", {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            descrip: { type: String, required: true },          
            stock: { type: Number, required: true },                  
            codigo: { type: String, required: false },
         })
   }
   async getByIdgraph(id){
      try{
         const doc= await this.collection.findOne({_id: id})
         return doc
      }catch(err){
      logger.error(err)
      } 
   }
   async getAllgraph(){
      try{
    const doc = await this.collection.find({})
    return doc
      }catch(err){
         logger.error(err)
      }
    }
   async createDocument(document){
      try{
    const doc = await this.collection.insertMany(document)
    return doc[0]._id
      }catch(err){
         logger.error(err)
      }}
   async createProductGraph(data){
      try{
      const doc = await this.collection.insertMany(data)
      return doc[0]

      }catch(err){
         logger.error(err)
      }

   }

   async updateProductGraph(id, data) {
      try{
     const doc = await this.collection.updateOne({_id: id }, {$set: data});	
     
     return id, data

      }catch(err){
         logger.error(err)
      }

   }

   async deleteByIdgraph(id){
      try{
         
      const doc = await this.collection.deleteOne({_id: id}).clone();
      
      return doc
   }catch(err){
         console.log(err)
      }
   }
  





   static getInstance(){
      if (!instance) {
          instance= new contenedorProds();
      
      }
      return instance ;
   }


}

export default contenedorProds;