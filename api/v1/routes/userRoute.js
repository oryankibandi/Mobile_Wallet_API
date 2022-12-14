const express = require("express");
const userController = require("../controllers/userController");

let router = express.Router();

router.route("/create").post(userController.createUserController);

router.route("/login").post(userController.loginUserController);

router.route("/refresh").get(userController.refreshTokenController);

module.exports = router;
