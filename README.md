# Mobile Wallet API

This is a mobile wallet api that allows users to: 1. Create an account 2. Create a wallet 3. Fund their account 4. Withdraw from their wallet 5. Transfer funds from one wallet to another

## Stack

1. [KnexORM](https://knexjs.org/) - A Object Relationam Mapper that help with interacting with SQL databases.
2. [MySQL](https://www.mysql.com/) - A relational database
3. [NodeJS](https://nodejs.org/) - Javascript runtime environment for runnign server-side code
4. [ExpressJS](https://expressjs.com/) - A javascript framework for building APIs
5. [Paystack](https://paystack.com/) - An payment gateway that helps businesses collect payments

## Database Design

![Database Design](https://github.com/oryankibandi/Mobile_Wallet_API/blob/main/api/v1/DB/KnexORM/schema/database_schemas.png?raw=true)

### Tables

1. users - stores a record of all users registered on the system.
2. wallets - stores all wallets.
3. transactions - stores a record of all transactions made.

### Endpoints

1. /user/create **_POST_** creates a new user and assigns them a wallet.
   **body**

```bash
{
  "first_name": "john",
  "last_name": "doe",
  "email": "johndoe@gmail.com",
  "password": "1234*",
  "phone_number": "+237000000000",
  "id_number": "11111111",
  "user_pin": "1234"
}
```

2. /user/login **_POST_** authenticates a user and return an access token and a refresh token as a cookie valid for 6 hours and 6 days respectively.

```bash
{
  "email": "johndoe@gmail.com",
  "password": "1234*"
}
```

3. /user/refresh **_GET_** Gets a new access token after the old one is expired. The refresh token should be sent as a cookie along with the request.

4. /wallet/balance **_GET_** Gets the balance of an existing wallet. An access token should be sent in the header as `Bearer token`.
   `user_pin` should be set as a query parameter to authenticate the user.

5. /wallet/fund **_POST_** funds a wallet. Returns a paystack url to make the payment. An access token should be sent in the header as `Bearer token`.

```bash
{
    "amount": "35000",
    "currency": "NGN"
}
```

6. /wallet/transfer **_POST_** Transfers funds from one wallet to another. An access token should be sent in the header as `Bearer token`.

```bash
{
	"amount" : 2000,
	"recipient_uid": "someuseruid",
	"sender_pin": "****"
}
```

### Future Improvements

- [ ] Add a webhook url to receive events from paystack API.
- [ ] Add transactions service that validates all transactions before adding them to the database
- [ ] Add a service that aggregates transaction data for credit scoring service to provide credit score data to loaning facilities.
