const Wallet = require("../../entities/wallet");
const verifyPin = require("./verifyPin");

const checkWalletBalance = async (
  user_uid,
  user_pin,
  cryptoInstance,
  dbInstance
) => {
  const retrieved_wallet = await dbInstance.find("wallets", {
    user_uid: user_uid,
  });
  const wallet = new Wallet(retrieved_wallet[0]);

  const verified = await verifyPin(
    user_uid,
    user_pin,
    wallet.toFormattedJson(),
    cryptoInstance
  );

  if (verified) {
    return wallet.getBalance();
  }
};

module.exports = checkWalletBalance;
