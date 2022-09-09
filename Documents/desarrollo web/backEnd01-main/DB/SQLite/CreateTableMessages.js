const database = require('../database').databaseConnectionSQLite3
import {logger} from "../../logs/loggers.js"
const createMessagesTable = async () => {
    try{
        await database.schema.dropTableIfExists('mensajes')
        await database.schema.createTable("mensajes", MessageTable=>{
            MessageTable.string("Email", 50).notNullable();
            MessageTable.string("Date", 50).notNullable();
            MessageTable.string('Message', 50).notNullable();
        })
        logger.info("Message Table created")
        
    } catch(err){
        logger.error("error: ", err);
        database.destroy();
    }
        
}

createMessagesTable();



 