import ContenedorFirebase from "./firebaseContenedor.js";
let instance 
class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super("Productos");
    }

    static getInstance(){
        if (!instance) {
            instance= new ProductosFirebase();
        
        }
        return instance ;


}
}

export default ProductosFirebase;