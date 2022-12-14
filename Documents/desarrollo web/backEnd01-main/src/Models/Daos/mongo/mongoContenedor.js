import mongoose from "mongoose";
import configs from "../../../Connections/configs.js";


mongoose.connect(configs.mongodb.connectionString);
class contenedorMongo {
  constructor(coleccion, esquema) {
    this.collection = mongoose.model(coleccion, esquema);
  }
  async getAll() {
    const docs = await this.collection.find();

    return docs;
  }

  async getById(id) {
    const doc = await this.collection.findById(id);

    return doc;
  }

  async saveObject(elemento) {
    const nuevoElemento = new this.collection(elemento);
    let nuevoElementoGuardado = await nuevoElemento.save();

    return nuevoElementoGuardado;
  }
  async updateDocument(id, elemento){
    try{
      const doc = await this.collection.updateOne({_id: id}, {$set: elemento}) 
      return doc
    }catch(err){
      console.log(err)}
    }
     
  
  async updateById(id, elemento) {
    let resultado;
    await this.collection
      .findByIdAndUpdate(id, elemento, function (error, doc) {
        if (error) {
          resultado = error;
        } else {
          resultado = doc;
        }
      })
      .clone();

    return resultado;
  }

  async deleteById(id) {
    let resultado;
    await this.collection
      .findByIdAndDelete(id, {}, function (error, doc) {
        if (error) {
          resultado = error;
        } else {
          resultado = doc;
        }
      })
      .clone();

    return resultado;
  }

  async saveCartCont(nuevoCarrito) {
    let resultado = await this.saveObject(nuevoCarrito);
    return resultado.id;
  }

  async saveInCart(idCart, elemento) {
    let resultado;
    let tempCart = await this.getById(idCart);
    if (tempCart) {
      tempCart.productos.push(elemento);
      await this.updateById(idCart, tempCart);
      resultado = `Producto : ${elemento.title},  ha sido añadido correctamente al cart con ID ${idCart}`;
    } else {
      resultado = "El id de carrito no existe";
    }
    return resultado;
  }

  async eraseFromCart(id, array) {
    await this.collection.findByIdAndUpdate(id, { productos: array });
  }
}

export default contenedorMongo;
