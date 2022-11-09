const User = require("../../entities/user");

const refreshUser = async (
  refreshToken,
  dbInstance,
  jwtInstance,
  refreshTokenSecret
) => {
  jwtInstance.on("invalidToken", (error) => {
    if (error.message === "jwt expired") {
      throw new Error("token Expired. Please log In again.");
    }
    throw new Error(error.message);
  });

  const decoded = await jwtInstance.verify(refreshToken, refreshTokenSecret);

  const existing_user = await dbInstance.find("users", {
    user_uid: decoded.user_uid,
  });

  const user = new User(existing_user[0]);
  const user_details = user.toFormattedJson();

  if (user_details.refreshToken !== refreshToken) {
    dbInstance.update(
      "users",
      { user_uid: decoded.user_uid },
      { refreshToken: null }
    );
    throw new Error("Invalid session");
  }

  const payload = user.toFilteredJson();
  const accessToken = jwtInstance.generateAccessToken(payload);

  return accessToken;
};

module.exports = refreshUser;
