const createUser = require("./createUser");

module.exports = {
  createUser: async (userDetails, dbInstance, cryptoInstance, encoder) =>
    await createUser(userDetails, dbInstance, cryptoInstance, encoder),
};
