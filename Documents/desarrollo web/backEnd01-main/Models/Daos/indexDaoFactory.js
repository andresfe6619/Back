//este es un sistema muy parecido al factory, sin decir que es el mismo, asi que unicamente lo dejé asi y añadí 
// el users
import dotenv from "dotenv";
dotenv.config({path: ".env"});

import { usersSchema } from "./mongo/usersModel.js";
import {logger} from "../../logs/loggers.js"



let userDao =  usersSchema.getInstance()
let productDao
let CarroDao
switch (process.env.DATABASE)
//switch (process.argv[2])
{
    case "mongo":
        const { default: ProductDaoMongo } = await import("./mongo/productos.dao.js");
        const { default: CartMongo } = await import("./mongo/carritos.dao.js");
      
        productDao =  ProductDaoMongo.getInstance();
        CarroDao =   CartMongo.getInstance();
       logger.info("Mongo is working")
        break;
    case "firebase":
        const { default: ProductDaoFirebase } = await import("./Firebase/productos.dao.js");
        const { default: CartDaoFirebase } = await import("./Firebase/carritos.dao.js");
        productDao =  ProductDaoFirebase.getInstance();
        CarroDao =  CartDaoFirebase.getInstance();
        logger.info("firebase is working")
        break;
};

export { productDao, CarroDao, userDao};