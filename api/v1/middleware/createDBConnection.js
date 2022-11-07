const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);

const createDBConnection = async (req, res, next) => {
  req.knex = knex;
  next();
};

module.exports = createDBConnection;
