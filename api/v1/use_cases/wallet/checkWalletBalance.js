const Wallet = require("../../entities/wallet");

const checkWalletBalance = async (user_uid, dbInstance) => {
  const user = await dbInstance.find("wallets", { user_uid: user_uid }, [
    "balance",
    "currency",
  ]);

  return user[0];
};

module.exports = checkWalletBalance;
