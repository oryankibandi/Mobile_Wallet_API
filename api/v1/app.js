require("dotenv").config({ path: __dirname + "/.env" });
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig);
