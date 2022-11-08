require("dotenv").config();
const Events = require("events");
const jwt = require("jsonwebtoken");

class JWT extends Events {
  constructor() {
    super();
  }

  async generateAccessToken(payload, duration = "6h") {
    try {
      const token = jwt.sign(payload, process.env.REFRESHTOKENSECRET, {
        expiresIn: duration,
      });

      this.emit("accessTokenGenerated");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async generateRefreshToken(payload, duration = "6d") {
    try {
      const token = jwt.sign(payload, process.env.REFRESHTOKENSECRET, {
        expiresIn: duration,
      });

      this.emit("refreshTokenGenerated");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verify(token, secret) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        this.emit("invalidToken");
      }

      this.emit("decoded", decoded);
    });
  }
}

module.exports = JWT;
