require("dotenv").config();
const Events = require("node:events");
const axios = require("axios");

class Paystack extends Events {
  constructor() {
    super();
    this.key = process.env.PAYSTACK_SECRET_KEY;
    this.url = process.env.PAYSTACK_BASE_URL;

    axios.defaults.baseURL = this.url;
    axios.defaults.headers.common["Authorization"] = "Bearer".concat(
      " ",
      this.key
    );
  }

  async initializeTransaction(amount, email, currency) {
    const body = {
      amount: amount,
      email: email,
      currency: currency,
    };

    try {
      const response = await axios.post("/transaction/initialize", body);
      if (response.status) {
        this.emit("transactionInitialized", response.data);
        return response.data.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyTransaction() {}

  async listTransactions() {}

  async getTransactions() {}
}

module.exports = Paystack;
