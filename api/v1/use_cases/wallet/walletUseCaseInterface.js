const createWallet = require("./createWallet");
const fundWallet = require("./fundWallet");
const checkWalletBalance = require("./checkWalletBalance");

module.exports = {
  createWallet: (dbInstance, cryptoInstance, encoder, user_uid, user_pin) =>
    createWallet(dbInstance, cryptoInstance, encoder, user_uid, user_pin),

  fundWallet: async (userDetails, dbInstance, paystackInstance) =>
    fundWallet(userDetails, dbInstance, paystackInstance),
  checkWalletBalance: async (user_uid, dbInstance) =>
    checkWalletBalance(user_uid, dbInstance),
};
