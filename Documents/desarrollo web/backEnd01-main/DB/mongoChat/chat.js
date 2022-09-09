import mongoose from "mongoose";
import {mongoConnection} from "../database.js";
import {logger} from "../../logs/loggers.js";
 mongoose.connect(mongoConnection);

class Chat{
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, {timestamps: true}));
    
    }

    async save(mensaje){
        const objetoModel = new this.collection(mensaje);
     
        try{
            const res = await objetoModel.save();
           logger.info("guardando"+ res)
            return res;
        
        }
        
        catch(err){
            logger.error("Error guardando: ", err);
            return false;
        }
    }

    async getAll(){
        try{
            const mensajes = await this.collection.find({}, { __v: 0 })
            logger.info("trayendo mensajes")
            return mensajes;
        } catch(err){
            logger.error("Error trayendo mensajes: ", err);
            return false;
        }
    }
}

export default Chat;
