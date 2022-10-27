import mongoose from "mongoose"

await mongoose.connect("mongodb+srv://Andres:Andres@cluster0.vor56.mongodb.net/E-commerce")
class Repository {
    constructor (coleccion, esquema){
this.collection = mongoose.model(coleccion, esquema)
    }
    async getAll () {
        const docs = await this.collection.find({}, { __v: 0 });
        return docs;
        }
    
        async getById (id) {
            const doc = await this.collection.findById(id, { __v: 0 });
            return doc;
        }
    
        async saveObject (elemento) {
            elemento.timestamp = new Date().toLocaleString("fr-FR");
            const nuevoElemento = new this.collection(elemento);
            let nuevoElementoGuardado = await nuevoElemento.save();
            return(nuevoElementoGuardado);
        }
    
        async updateById (id, elemento) {
            let resultado;
            await this.collection.findByIdAndUpdate(id, elemento, function (error, doc) {
                if (error){
                    resultado = error;
                } else {
                    resultado = doc;
                }
            }).clone();
            return resultado
        }
    
        async deleteById ( id ) {
            let resultado;
            await this.collection.findByIdAndDelete(id,{},function (error, doc){
                if(error){
                    resultado = error;
                } else {
                    resultado = doc;
                }
            }).clone();
            return resultado;
        }
    

}



export default Repository