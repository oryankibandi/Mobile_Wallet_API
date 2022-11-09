require("dotenv").config();
const userUseCase = require("../use_cases/user/userUseCaseInterface");
const MySQLDB = require("../DB/KnexORM/MySQLDBInterface");
const Crypto = require("../helpers/crypto");
const JWT = require("../helpers/jwt");

const createUserController = async (req, res) => {
  const userDetails = req.body;

  if (!userDetails.first_name) {
    return res.status(401).json({
      status: "ERROR",
      message: "first_name not provided",
    });
  }
  if (!userDetails.last_name) {
    return res.status(401).json({
      status: "ERROR",
      message: "last_name not provided",
    });
  }
  if (!userDetails.phone_number) {
    return res.status(401).json({
      status: "ERROR",
      message: "phone_number not provided",
    });
  }
  if (!userDetails.email) {
    return res.status(401).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!userDetails.id_number) {
    return res.status(401).json({
      status: "ERROR",
      message: "id_number not provided",
    });
  }
  if (!userDetails.user_pin) {
    return res.status(401).json({
      status: "ERROR",
      message: "id_number not provided",
    });
  }

  try {
    const dbInstance = new MySQLDB(req.knex);
    const cryptoInstance = new Crypto();

    const new_user_email = await userUseCase.createUser(
      userDetails,
      dbInstance,
      cryptoInstance
    );

    res.status(200).json({
      status: "SUCCESS",
      data: {
        email: new_user_email,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!password) {
    return res.status(401).json({
      status: "ERROR",
      message: "password not provided",
    });
  }

  try {
    const dbInstance = new MySQLDB(req.knex);
    const cryptoInstance = new Crypto();
    const jwtInstance = new JWT();

    const userData = await userUseCase.loginUser(
      req.body,
      dbInstance,
      jwtInstance,
      cryptoInstance
    );

    res.cookie("jwt", userData.refreshToken);
    delete userData.refreshToken;

    return res.status(200).json({
      status: "SUCCESS",
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({
      error: "no refreshToken provided",
    });
  }

  try {
    const dbInstance = new MySQLDB(req.knex);
    const jwtInstance = new JWT();
    const accessToken = await userUseCase.refreshUser(
      cookies.jwt,
      dbInstance,
      jwtInstance,
      process.env.REFRESHTOKENSECRET
    );

    res.status(200).json({
      status: "SUCCESS",
      data: {
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  refreshTokenController,
};
