const knexConf = require("../../knexfile");
const knex = require("knex")(knexConf);

modules.exports = knex;
