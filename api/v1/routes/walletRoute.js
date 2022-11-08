const express = require("express");
const walletController = require("../controllers/walletController");
let router = express.Router();

router.route("/fund").post(walletController.fundWalletController);
router.route("/balance").get(walletController.checkWalletBalanceController);

module.exports = router;
