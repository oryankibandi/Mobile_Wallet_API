class Wallet {
  constructor(wallet_details) {
    this.validate(wallet_details);

    this.wallet_uid = wallet_details.wallet_uid;
    this.user_uid = wallet_details.user_uid;
    this.public_key = wallet_details.public_key;
    this.encrypted_private_key = wallet_details.encrypted_private_key;
  }

  validate(wallet_details) {
    const { wallet_uid, user_uid, public_key, encrypted_private_key } =
      wallet_details;

    if (!wallet_uid) throw new Error("wallet_uid not provided");
    if (!user_uid) throw new Error("user_uid not provided");
    if (!public_key) throw new Error("public_key not provided");
    if (!encrypted_private_key)
      throw new Error("encrypted_private_key not provided");
  }
}
