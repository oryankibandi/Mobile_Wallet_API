const createUser = require("./createUser");
const loginUser = require("./loginUser");
const refreshUser = require("./refreshUser");

module.exports = {
  createUser: async (userDetails, dbInstance, cryptoInstance) =>
    await createUser(userDetails, dbInstance, cryptoInstance),
  loginUser: async (userDetails, dbInstance, jwtInstance, cryptoInstance) =>
    await loginUser(userDetails, dbInstance, jwtInstance, cryptoInstance),
  refreshUser: async (
    refreshToken,
    dbInstance,
    jwtInstance,
    refreshTokenSecret
  ) => refreshUser(refreshToken, dbInstance, jwtInstance, refreshTokenSecret),
};
