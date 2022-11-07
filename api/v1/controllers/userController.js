const userUseCase = require("../use_cases/user/userUseCaseInterface");
const MySQLDB = require("../DB/KnexORM/MySQLDBInterface");
const Crypto = require("../helpers/crypto");
const encoder = require("../helpers/encoder");

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
      cryptoInstance,
      encoder
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

module.exports = {
  createUserController,
};
