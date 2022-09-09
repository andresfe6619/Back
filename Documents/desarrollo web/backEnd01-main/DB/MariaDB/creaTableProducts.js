import database  from '../database'
import {logger} from "../../logs/loggers.js"
database.databaseConnection
const createProductsTable = async () => {
    try{
        await database.schema.createTable("productos", productTable=>{
            productTable.increments("id").primary();
            productTable.string("title", 50).notNullable();
            productTable.string("thumbnail", 50).notNullable();
            productTable.integer('price').notNullable();
        })
        logger.info("product table created")
        database.destroy();
    } catch(err){
        logger.console.error();("error: ", err);
        database.destroy();
    }
        
}

 createProductsTable()