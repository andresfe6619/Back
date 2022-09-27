import dotenv from "dotenv";
dotenv.config({path: ".env"});

let productDao
let CarroDao
switch (process.env.DATABASE) {
    case "mongo":
        const { default: ProductDaoMongo } = await import("./mongo/productos.dao.js");
        const { default: CartMongo } = await import("./mongo/carritos.dao.js");
        productDao = new ProductDaoMongo;
        CarroDao =  new CartMongo;
       
        break;
    case "firebase":
        const { default: ProductDaoFirebase } = await import("./Firebase/productos.dao.js");
        const { default: CartDaoFirebase } = await import("./Firebase/carritos.dao.js");
        productDao = new ProductDaoFirebase;
        CarroDao = new CartDaoFirebase;
        break;
};

export { productDao, CarroDao };
