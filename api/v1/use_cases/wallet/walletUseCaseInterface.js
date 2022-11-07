const createWallet = require("./createWallet");

module.exports = {
  createWallet: (dbInstance, cryptoInstance, encoder, user_uid, user_pin) =>
    createWallet(dbInstance, cryptoInstance, encoder, user_uid, user_pin),
};
