require("dotenv").config;
const JWT = require("../helpers/jwt");

const verifyJwt = async (req, res, next) => {
  if (req.url.includes("/user" || "refresh")) {
    return next();
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    res.status(401).json({
      status: "ERROR",
      message: "no token provided",
    });
  } else {
    console.log("AuthHeader: ", authHeader);
    const jwt = authHeader.split(" ")[1];
    const jwtInstance = new JWT();
    jwtInstance.on("decoded", (decoded) => {
      console.log("Decoded: ", decoded);
      req.user_uid = decoded.user_uid;
      req.first_name = decoded.first_name;
      req.last_name = decoded.last_name;
      req.email = decoded.email;

      return next();
    });

    jwtInstance.on("invalidToken", () => {
      console.log("Invalid Token");
      res.status(401).json({
        status: "ERROR",
        message: "invalid token",
      });
    });

    jwtInstance.verify(jwt, process.env.ACCESSTOKENSECRET);
  }
};

module.exports = verifyJwt;
