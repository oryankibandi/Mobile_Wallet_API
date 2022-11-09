const createWallet = require("./createWallet");
const fundWallet = require("./fundWallet");
const checkWalletBalance = require("./checkWalletBalance");
const verifyPin = require("./verifyPin");
const transferFromWallet = require("./transferFromWallet");

module.exports = {
  createWallet: (dbInstance, cryptoInstance, user_uid, user_pin) =>
    createWallet(dbInstance, cryptoInstance, user_uid, user_pin),

  fundWallet: async (userDetails, dbInstance, paystackInstance) =>
    fundWallet(userDetails, dbInstance, paystackInstance),
  checkWalletBalance: async (user_uid, user_pin, cryptoInstance, dbInstance) =>
    checkWalletBalance(user_uid, user_pin, cryptoInstance, dbInstance),
  verifyPin: async (user_uid, user_pin, dbInstance, cryptoInstance) =>
    verifyPin(user_uid, user_pin, dbInstance, cryptoInstance),
  transferFromWallet: async (
    sender_pin,
    sender_uid,
    recipient_uid,
    amount,
    dbInstance,
    cryptoInsance
  ) =>
    transferFromWallet(
      sender_pin,
      sender_uid,
      recipient_uid,
      amount,
      dbInstance,
      cryptoInsance
    ),
};
