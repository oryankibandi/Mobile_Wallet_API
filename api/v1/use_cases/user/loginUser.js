const User = require("../../entities/user");

const loginUser = async (
  userDetails,
  dbInstance,
  jwtInstance,
  cryptoInstance
) => {
  const existing_user = await dbInstance.find(
    "users",
    { email: userDetails.email },
    []
  );

  if (existing_user.length === 0) throw new Error("User doesn't exist");
  if (existing_user.length > 1) throw new Error("multiple users found");

  const rehashed_password = cryptoInstance.generateHash(
    userDetails.password,
    "password"
  );

  if (existing_user[0].hashed_password !== rehashed_password) {
    throw new Error("Invalid password or email");
  }

  const user = new User(existing_user[0]);

  const userPayload = user.toFilteredJson();

  const accessToken = await jwtInstance.generateAccessToken(userPayload);
  const refreshToken = await jwtInstance.generateRefreshToken(userPayload);

  await dbInstance.update(
    "users",
    { email: userPayload.email },
    { refreshToken: refreshToken }
  );

  return {
    user: userPayload,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

module.exports = loginUser;
