const Wallet = require("../../entities/wallet");

createWallet = (dbInstance, cryptoInstance, user_uid, user_pin) => {
  if (!dbInstance) throw new Error("No DB instance provided");
  if (!cryptoInstance) throw new Error("No crypto instance provided");
  if (!user_uid) throw new Error("user_uid not provided");
  if (!user_pin) throw new Error("user_pin not provided");

  let wallet = {};

  wallet.wallet_uid = cryptoInstance.generateUid();
  wallet.user_uid = user_uid;
  wallet.balance = 0;
  wallet.currency = "NGN";

  cryptoInstance.on("encrypted", (iv, encrypted) => {
    wallet.encrypted_private_key = encrypted;
    wallet.initialization_vector = iv;

    const new_wallet = new Wallet(wallet);
    new_wallet.prepend();
    dbInstance.insert("wallets", new_wallet.toFormattedJson());
  });

  cryptoInstance.on("verificationHash", (hash) => {
    wallet.verification_string = hash;
  });

  cryptoInstance.on("keyPairCreated", (publicKey, privateKey) => {
    wallet.public_key = publicKey;
    cryptoInstance.generateHash(
      user_uid.concat("", privateKey),
      "verification"
    );
    cryptoInstance.cipher(privateKey, user_pin);
  });

  cryptoInstance.createKeyPair();
};

module.exports = createWallet;
