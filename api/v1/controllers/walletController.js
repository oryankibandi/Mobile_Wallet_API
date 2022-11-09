const walletUseCaseInterface = require("../use_cases/wallet/walletUseCaseInterface");
const MySQLDB = require("../DB/KnexORM/MySQLDBInterface");
const Paystack = require("../helpers/paystack");
const Crypto = require("../helpers/crypto");

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
  const { user_pin } = req.query;

  try {
    const dbInstance = new MySQLDB(req.knex);
    const cryptoInstance = new Crypto();
    const data = await walletUseCaseInterface.checkWalletBalance(
      user_uid,
      user_pin,
      cryptoInstance,
      dbInstance
    );

    res.status(200).json({
      status: "SUCCESS",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const transferFromWalletController = async (req, res) => {
  const { sender_pin, recipient_uid, amount } = req.body;
  const { user_uid } = req;

  if (!sender_pin) {
    res.status(400).json({
      status: "ERROR",
      message: "sender_pin not provided",
    });
  }
  if (!recipient_uid) {
    res.status(400).json({
      status: "ERROR",
      message: "recipient_uid not provided",
    });
  }
  if (!amount) {
    res.status(400).json({
      status: "ERROR",
      message: "amount not provided",
    });
  }

  try {
    const dbInstance = new MySQLDB(req.knex);
    const cryptoInsance = new Crypto();

    const data = await walletUseCaseInterface.transferFromWallet(
      sender_pin,
      user_uid,
      recipient_uid,
      amount,
      dbInstance,
      cryptoInsance
    );

    res.status(200).json({
      status: "SUCCESS",
      data: data,
    });
  } catch (error) {
    res.status(403).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  fundWalletController,
  checkWalletBalanceController,
  transferFromWalletController,
};
