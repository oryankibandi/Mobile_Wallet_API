const createUser = require("./createUser");
const loginUser = require("./loginUser");

module.exports = {
  createUser: async (userDetails, dbInstance, cryptoInstance, encoder) =>
    await createUser(userDetails, dbInstance, cryptoInstance, encoder),
  loginUser: async (userDetails, dbInstance, jwtInstance, cryptoInstance) =>
    await loginUser(userDetails, dbInstance, jwtInstance, cryptoInstance),
};
