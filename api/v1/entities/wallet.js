class Wallet {
  constructor(wallet_details) {
    this.validate(wallet_details);

    this.wallet_uid = wallet_details.wallet_uid;
    this.user_uid = wallet_details.user_uid;
    this.public_key = wallet_details.public_key;
    this.encrypted_private_key = wallet_details.encrypted_private_key;
    this.balance = wallet_details.balance;
    this.initialization_vector = wallet_details.initialization_vector;
    this.verification_string = wallet_details.verification_string;
  }

  validate(wallet_details) {
    const {
      wallet_uid,
      user_uid,
      public_key,
      encrypted_private_key,
      initialization_vector,
      verification_string,
    } = wallet_details;

    if (!wallet_uid) throw new Error("wallet_uid not provided");
    if (!initialization_vector)
      throw new Error("initialization_vector not provided");
    if (!verification_string)
      throw new Error("verification_string not provided");
    if (!user_uid) throw new Error("user_uid not provided");
    if (!public_key) throw new Error("public_key not provided");
    if (!encrypted_private_key)
      throw new Error("encrypted_private_key not provided");
  }

  prepend() {
    this.wallet_uid = "wallet".concat("_", this.wallet_uid);
  }

  toFormattedJson() {
    return Object.freeze({
      wallet_uid: this.wallet_uid,
      user_uid: this.user_uid,
      public_key: this.public_key,
      encrypted_private_key: this.encrypted_private_key,
      balance: this.balance,
      initialization_vector: this.initialization_vector,
      verification_string: this.verification_string,
    });
  }
}

module.exports = Wallet;
