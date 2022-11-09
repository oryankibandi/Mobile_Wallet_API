class Transaction {
  constructor(transactionData) {
    if (transactionData.user_uid.substr(0, 5) !== "user_") {
      throw new Error("Invalid user_uid");
    }

    this.id = transactionData.id ?? null;
    this.user_uid = transactionData.user_uid;
    this.authorization_url = transactionData.authorization_url;
    this.access_code = transactionData.access_code;
    this.reference = transactionData.reference;
    this.amount = transactionData.amount;
    this.currency = transactionData.currency;
    this.transaction_type = transactionData.transaction_type;
    this.recipient = transactionData.recipient ?? null;
    this.status = transactionData.status ?? "pending";
  }

  toFormattedJson() {
    return Object.freeze({
      id: this.id,
      user_uid: this.user_uid,
      authorization_url: this.authorization_url,
      access_code: this.access_code,
      reference: this.reference,
      amount: this.amount,
      currency: this.currency,
      transaction_type: this.transaction_type,
      recipient: this.recipient,
      status: this.status,
    });
  }

  toFilterdJson() {
    return Object.freeze({
      user_uid: this.user_uid,
      authorization_url: this.authorization_url,
      reference: this.reference,
      amount: this.amount,
      currency: this.currency,
      transaction_type: this.transaction_type,
      status: this.status,
    });
  }
}

module.exports = Transaction;
