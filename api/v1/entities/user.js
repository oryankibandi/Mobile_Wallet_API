class User {
  constructor(userDetails) {
    this.validate(userDetails);

    this.user_uid = userDetails.user_uid;
    this.first_name = userDetails.first_name;
    this.last_name = userDetails.last_name;
    this.phone_number = userDetails.phone_number;
    this.email = userDetails.email;
    this.id_number = userDetails.id_number;
    this.hashed_password = userDetails.hashed_password;
    this.wallet_hash = userDetails.wallet_hash;
    this.refreshToken = userDetails.refreshToken ?? null;
  }

  validate(userDetails) {
    const {
      user_uid,
      first_name,
      last_name,
      phone_number,
      email,
      id_number,
      hashed_password,
    } = userDetails;

    if (!user_uid) throw new Error("user_uid not provided");
    if (!first_name) throw new Error("first_name not provided");
    if (!last_name) throw new Error("last_name not provided");
    if (!phone_number) throw new Error("phone_number not provided");
    if (!email) throw new Error("email not provided");
    if (!id_number) throw new Error("id_number not provided");
    if (!hashed_password) throw new Error("hashed_password not provided");
  }

  prepend() {
    this.user_uid = "user".concat("_", this.user_uid);
  }

  addRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
  }

  toFormattedJson() {
    return Object.freeze({
      user_uid: this.user_uid,
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number,
      email: this.email,
      id_number: this.id_number,
      hashed_password: this.hashed_password,
      refreshToken: this.refreshToken ? this.refreshToken : null,
    });
  }
}

module.exports = User;
