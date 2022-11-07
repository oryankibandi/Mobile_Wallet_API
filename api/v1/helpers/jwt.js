require("dotenv").config();
const Events = require("events");
const jwt = require("jsonwebtoken");

class JWT extends Events {
  constructor() {
    super();
  }

  async generateAccessToken(payload, duration) {
    jwt.sign(
      payload,
      process.env.ACCESSTOKENSECRET,
      { expiresIn: "6h" },
      (err, accessToken) => {
        if (err) throw new Error(err.message);

        this.emit("accessTokenGenerated", accessToken);
      }
    );
  }

  async generateRefreshToken(payload, duration) {
    jwt.sign(
      payload,
      process.env.REFRESHTOKENSECRET,
      { expiresIn: "6d" },
      (err, refreshToken) => {
        if (err) throw new Error(err.message);

        this.emit("refreshTokenGenerated", refreshToken);
      }
    );
  }

  async verify(token, secret) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new Error(err.message);

      this.emit("decoded", decoded);
    });
  }
}

module.exports = JWT;
