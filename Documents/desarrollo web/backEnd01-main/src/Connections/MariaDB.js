import knex  from 'knex'

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
  connection: { filename: 'public/DB/SQLite/db/ChatDB.sqlite' },
  useNullAsDefault: true
}



const databaseConnection = knex(config)
const databaseConnectionSQLite3 = knex(configSQLite3)
export default {databaseConnection, databaseConnectionSQLite3}