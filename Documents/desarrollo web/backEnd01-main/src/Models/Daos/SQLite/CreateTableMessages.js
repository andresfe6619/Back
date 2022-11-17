import database from "../database"
import { logger } from "../../logs/loggers.js";

const db = database.databaseConnectionSQLite3

const createMessagesTable = async () => {
  try {
    await db.schema.dropTableIfExists("mensajes");
    await db.schema.createTable("mensajes", (MessageTable) => {
      MessageTable.string("Email", 50).notNullable();
      MessageTable.string("Date", 50).notNullable();
      MessageTable.string("Message", 50).notNullable();
    });
    logger.info("Message Table created");
  } catch (err) {
    logger.error("error: ", err);
    db.destroy();
  }
};

createMessagesTable();
