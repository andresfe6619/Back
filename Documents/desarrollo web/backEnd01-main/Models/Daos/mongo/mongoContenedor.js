import mongoose from "mongoose";
import configs from "../../../Connections/configs.js";

await mongoose.connect(configs.mongodb.connectionString);

class contenedorMongo {
 constructor (coleccion, esquema) {
    this.collection = mongoose.model(coleccion, esquema);

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
    
    async saveCartCont () {
        const nuevoCarrito = { timestamp: "", productos: []};
        let resultado = await this.saveObject(nuevoCarrito);
        return resultado.id;
    }

    async saveInCart ( idCart, elemento) {
        let resultado;
        let tempCart = await this.getById(idCart);
        if ( tempCart ){
         elemento._id  = tempCart.productos.length + 1;   
            tempCart.productos.push( elemento);
            await this.updateById(idCart, tempCart);
            resultado = `Producto : ${elemento.title},  ha sido añadido correctamente al cart con ID ${idCart}`;
        } else {
            resultado = "El id de carrito no existe";
        }
        return resultado
    }

    async eraseFromCart (idCart, idProduct) {
        let resultado;
        let tempCart = await this.getById(idCart);
        if (tempCart){
            let arrayProducts = tempCart.productos;
            let index = arrayProducts.findIndex(x => x._id == idProduct);
              console.log ("indice : ", index)
            if (index >= 0) {
                 arrayProducts.splice(index, 1);
                 await this.collection.findByIdAndUpdate(idCart, {productos: arrayProducts});
                 resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
             } else {
                 resultado = "El carrito es correcto pero el producto no existe";
             }
         } else {
             resultado = "El carrito no existe"
         }
     return resultado;
    }
}

export default contenedorMongo;