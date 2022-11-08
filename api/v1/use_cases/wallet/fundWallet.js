const Transaction = require("../../entities/transaction");

const fundWallet = async (userDetails, dbInstance, paystackInstance) => {
  const { user_uid, email, amount, currency } = userDetails;

  if (!user_uid) throw new Error("user_uid not provided");
  if (!email) throw new Error("email not provided");
  if (!amount) throw new Error("amount not provided");
  if (!currency) throw new Error("currency not provided");

  try {
    const data = await paystackInstance.initializeTransaction(
      amount,
      email,
      currency
    );
    data.user_uid = user_uid;
    data.amount = amount;
    data.transaction_type = "deposit";
    data.currency = currency;

    const transaction = new Transaction(data);

    dbInstance.insert("transactions", transaction.toFormattedJson(), []);

    return transaction.toFilterdJson();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = fundWallet;
