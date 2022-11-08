const walletUseCaseInterface = require("../use_cases/wallet/walletUseCaseInterface");
const MySQLDB = require("../DB/KnexORM/MySQLDBInterface");
const Paystack = require("../helpers/paystack");

const fundWalletController = async (req, res) => {
  const { amount, currency } = req.body;
  const { user_uid, email } = req;

  if (!amount) {
    res.status(400).json({
      status: "ERROR",
      message: "amount not provided",
    });
  }
  if (!currency) {
    res.status(400).json({
      status: "ERROR",
      message: "currency not provided",
    });
  }
  const userDetails = {
    user_uid: user_uid,
    email: email,
    amount: amount,
    currency: currency,
  };

  try {
    const dbInstance = new MySQLDB(req.knex);
    const paystackInstance = new Paystack();
    const transactionData = await walletUseCaseInterface.fundWallet(
      userDetails,
      dbInstance,
      paystackInstance
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: transactionData,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const checkWalletBalanceController = async (req, res) => {
  const user_uid = req.user_uid;

  try {
    const dbInstance = new MySQLDB(req.knex);
    const data = await walletUseCaseInterface.checkWalletBalance(
      user_uid,
      dbInstance
    );

    res.status(200).json({
      status: "SUCCESS",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "SUCCESS",
      message: error.message,
    });
  }
};

module.exports = {
  fundWalletController,
  checkWalletBalanceController,
};
