import fs from "fs";
import {databaseConnection} from "../database.js"
import {logger} from "../../logs/loggers.js"
class Contenedor {
    constructor(table) {
        this.table = [table]
    }

    async save(objeto) {
        try {
            const id = await databaseConnection("productos").insert(objeto)
            objeto.id = id[0];
            this.table.push(objeto);
            logger.info("Producto cargado con ID : ", objeto.id);
            return objeto;
        } catch (err) {
            logger.error("Error guardando producto: ", err)
        }
    }

    async saveById(id, objeto) {
        try {
            const rid = await databaseConnection.from(this.table).where('id', '=', id).update(objeto)
            if (rid === 0) {
               logger.error(`Producto de ID ${id} no encontrado`)
                return { error: `Producto de ID ${id} no encontrado` }
            } else {
                logger.info(`Producto de ID ${id} actualizado`)
                return { success:`Producto de ID ${id} actualizado`  }
            }
        } catch (err) {
            logger.error("Error guardando producto por ID. Code: ", err)
            return {error: "error guardando producto"}
        }
    }

    async getById(id) {
        try {
            const product = await databaseConnection.from(this.table).where({id})
            
            if (product[0]) {
               
                return product[0]
            } else {
                logger.error(`Producto de ID ${id} no encontrado`)
                return { error: `Producto de ID ${id} no encontrado` }
            }
        } catch (err) {
            logger.error("Error buscando producto. Code: ", err)
            return {error: "error buscando producto"}
        }
    }

    async getAll() {
        try {
            const productos = await databaseConnection.from(this.table).select("*")
            logger.info("trayendo productos")
            return productos;
        } catch (err) {
            /* if no table */
            if (err.errno === 1146) {
                await createTable();
                logger.warn(`Tabla ${this.table} creada`)
                return []
            } else{
                logger.error("Error buscando productos. Code: ", err)
                return {error: "error buscando producto"}
            }
        }
    }

    async deleteById(id) {
        try {
            const rid = await databaseConnection(this.table).where({id}).del()
            if (rid === 0) {
               logger.error("Error buscando producto" + id)
                return { error: `Producto de ID ${id} no encontrado` }
            } else {
              logger.info("Producto eliminado de ID" + id)  
                return { success: `Producto de ID ${id} eliminado` }
            }
        } catch (err) {
            logger.error("Error eliminando producto por ID. Code: ", err)
            return { error: `Error eliminando producto` }
        }
    }
}
export default  Contenedor;