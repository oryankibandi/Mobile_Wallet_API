require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  migrations: {
    directory: __dirname + "/DB/KnexORM/migrations",
  },
};
