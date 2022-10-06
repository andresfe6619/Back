//este es un sistema muy parecido al factory, sin decir que es el mismo, asi que unicamente lo dejé asi y añadí 
// el users
import dotenv from "dotenv";
dotenv.config({path: ".env"});
import {findName, createUser, comparePass, cryptPass} from "../Daos/mongo/users.Dao.js"
import {logger} from "../../logs/loggers.js"
// Como no uso user con mongo unicamente los re defino con el prefijo Dao
let findNameDao = findName
let createUserDao = createUser
let comparePassDao = comparePass
let cryptPassDao = cryptPass



let productDao
let CarroDao
//switch (process.env.DATABASE)
switch (process.argv[2])
{
    case "mongo":
        const { default: ProductDaoMongo } = await import("./mongo/productos.dao.js");
        const { default: CartMongo } = await import("./mongo/carritos.dao.js");
      
        productDao = new ProductDaoMongo;
        CarroDao =  new CartMongo;
       logger.info("Mongo is working")
        break;
    case "firebase":
        const { default: ProductDaoFirebase } = await import("./Firebase/productos.dao.js");
        const { default: CartDaoFirebase } = await import("./Firebase/carritos.dao.js");
        productDao = new ProductDaoFirebase;
        CarroDao = new CartDaoFirebase;
        logger.info("firebase is working")
        break;
};

export { productDao, CarroDao, findNameDao, createUserDao, comparePassDao, cryptPassDao };
