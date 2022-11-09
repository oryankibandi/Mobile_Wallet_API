const express = require("express");
const walletController = require("../controllers/walletController");
let router = express.Router();

router.route("/fund").post(walletController.fundWalletController);
router.route("/balance").get(walletController.checkWalletBalanceController);
router.route("/transfer").post(walletController.transferFromWalletController);

module.exports = router;
