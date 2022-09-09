import { logger } from 'handlebars';
import {databaseConnectionSQLite3} from '../database.js'
import {logger} from "../../logs/loggers.js"
class Contenedor {
    constructor(table) {
        this.table = table
    }

    async saveSQL(objeto) {
        try {
            
            await database("mensajes").insert(objeto)
            
            logger.info("Mensajes guardados");
            return objeto;
        } catch (err) {
            logger.error("Error guardando Mensaje: ", err)
        }
    }

    async getAllSQL() {
        try {
            const mensajes = await database.from("mensajes").select("*")
            logger.info("trayendo mensajes")
            return mensajes;
        
        } catch (err) {
            /* if no table */
           logger.error("error trayendo mensajes")
            if (err.errno === 1146){
             
            }
        }}


}

export default  Contenedor;