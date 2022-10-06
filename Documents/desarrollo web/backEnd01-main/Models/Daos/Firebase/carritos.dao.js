import ContenedorFirebase from "./firebaseContenedor.js";
let instance
class FirebaseCart extends ContenedorFirebase {
    constructor() {
        super("Carrito");
    }


    static getInstance(){
        if (!instance) {
            instance= new FirebaseCart();
        
        }
        return instance ;
}
}
export default FirebaseCart;