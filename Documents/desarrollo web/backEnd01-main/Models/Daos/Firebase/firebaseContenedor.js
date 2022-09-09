import admin from 'firebase-admin';
import configs from "../../Connections/configs.js";


admin.initializeApp({
    credential: admin.credential.cert(configs.firebase),
    
});


const db = admin.firestore();

class ContenedorFirebase {
    constructor (nombreColeccion) {
        this.collection = db.collection(nombreColeccion)
    }

    async getAll () {
        const docs = await this.collection;
        const All = await docs.get();
        let arrayProductos = [];
        All.forEach(doc => {
            let data = doc.data();
            let id = doc.id;
            arrayProductos.push({...data, id});
        });
        return arrayProductos;
        }
    
        async getById (id) {
            const doc = await this.collection.doc(id).get();
            const data =  doc.data();
            return { ...data, id };
        }
    
        async saveObject (elemento) {
            elemento.timestamp = new Date().toLocaleString("fr-FR");
            delete elemento.administrador;
            const newElement = this.collection.doc();
            await newElement.create(elemento);
            return;
        }
    
        async updateById (id, elemento) {
            let resultado = "";
            resultado = await this.collection.doc(id).update(elemento);
            resultado = "OK";
            return resultado;
        }
    
        async deleteById ( id ) {
            await this.collection.doc(id).delete();
            let resultado = "OK";
            return resultado;
        }
        
        async saveCartCont () {
            const nuevoCarrito = {timestamp: "", productos: []};
            nuevoCarrito.timestamp = new Date().toLocaleString("fr-FR");
            let resultado = await this.collection.add(nuevoCarrito);
            return resultado.id;
        }
    
        async saveInCart ( idCart, elemento) {
            const date = new Date()
            const [month, day, year, hour, milisecond]= [date.getMonth(), date.getDate(), date.getFullYear(), date.getHours(),date.getMilliseconds()];
            const id = `${month}${day}${year}${hour}${milisecond}`
            elemento.id = id;
            const producto=  this.collection.doc(idCart);
          
            const productos = await producto.update({
           
            productos: admin.firestore.FieldValue.arrayUnion(elemento) , 
            
            })
        
            let resultado = `el producto ${elemento.title} de id : ${elemento.id} se ha añadido al carrito con ID ${idCart}`;
            return resultado;
        }
    
        async eraseFromCart (idCart, idProduct) {
            let resultado;
            await db.runTransaction(async (t) => {
                const doc = await t.get(this.collection.doc(idCart));
                let arrayProductos = [];
                arrayProductos = doc.data().productos;
                const indiceEncontrado = arrayProductos.findIndex((producto) =>{
                    return producto.id === idProduct;
                });
                if ( indiceEncontrado >= 0) {
                    arrayProductos.splice(indiceEncontrado, 1);
                    t.update(this.collection.doc(idCart), { productos: arrayProductos });
                    resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
                } else {
                    resultado = "El carrito es correcto pero el producto no existe"
                }
            });
            return resultado;
        }
}

export default ContenedorFirebase;

