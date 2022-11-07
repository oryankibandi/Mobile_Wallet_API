const User = require("../../entities/user");
const walletUseCaseInterface = require("../wallet/walletUseCaseInterface");

const createUser = async (userDetails, dbInstance, cryptoInstance, encoder) => {
  const existing_user = await dbInstance.find(
    "users",
    { email: userDetails.email },
    ["first_name", "last_name", "email"]
  );

  if (existing_user.length > 0) throw new Error("user already exists");

  //register event listeners
  cryptoInstance.on("passwordHash", (hash) => {
    userDetails.hashed_password = hash;
  });

  try {
    userDetails.user_uid = cryptoInstance.generateUid();
    cryptoInstance.generateHash(userDetails.password, "password");

    const user = new User(userDetails);

    user.prepend();

    const new_user = user.toFormattedJson();
    walletUseCaseInterface.createWallet(
      dbInstance,
      cryptoInstance,
      encoder,
      new_user.user_uid,
      userDetails.user_pin
    );

    await dbInstance.insert("users", new_user, []);

    return new_user.email;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createUser;
