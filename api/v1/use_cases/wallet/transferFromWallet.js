const Wallet = require("../../entities/wallet");
const verifyPin = require("./verifyPin");

const transferFromWallet = async (
  sender_pin,
  sender_uid,
  recipient_uid,
  amount,
  dbInstance,
  cryptoInsance
) => {
  const sender_wallet = await dbInstance.find("wallets", {
    user_uid: sender_uid,
  });
  const recipient_wallet = await dbInstance.find("wallets", {
    user_uid: recipient_uid,
  });

  if (sender_wallet.length === 0) throw new Error("sender wallet not found");
  if (recipient_wallet.length === 0)
    throw new Error("recipient wallet not found");

  const sender_wallet_obj = new Wallet(sender_wallet[0]);
  const recipient_wallet_obj = new Wallet(recipient_wallet[0]);

  const verified = await verifyPin(
    sender_uid,
    sender_pin,
    sender_wallet_obj.toFormattedJson(),
    cryptoInsance
  );

  if (verified) {
    sender_wallet_obj.verifyTransfer(amount);

    await dbInstance.decrement(
      "wallets",
      { user_uid: sender_wallet_obj.user_uid },
      "balance",
      amount
    );
    sender_wallet_obj.credit(amount);
    await dbInstance.increment(
      "wallets",
      { user_uid: sender_wallet_obj.user_uid },
      "balance",
      amount
    );
    recipient_wallet_obj.debit(amount);

    return sender_wallet_obj.getBalance();
  }
};
module.exports = transferFromWallet;
