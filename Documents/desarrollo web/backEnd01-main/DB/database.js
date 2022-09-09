import knex from 'knex'
import dotenv from "dotenv";
dotenv.config({path: ".env"});
const config = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "project",
  },
  pool: { min: 0, max: 7 },
}
const configSQLite3 = {
  client: "sqlite3",
  connection: { filename: '/DB/SQLite/db/ChatDB.sqlite' },
  useNullAsDefault: true
}


const mongoConnection = process.env.MONGO


const databaseConnection = knex(config)
const databaseConnectionSQLite3 = knex(configSQLite3)
export   {databaseConnection, databaseConnectionSQLite3, mongoConnection}

