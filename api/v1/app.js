require("dotenv").config({ path: __dirname + "/.env" });
const cluster = require("node:cluster");
const http = require("node:http");
const { cpus } = require("node:os");
const process = require("node:process");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3030;
const cors = require("cors");

const createDBConnection = require("./middleware/createDBConnection");
const verifyJwt = require("./middleware/verifyToken");
const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");

const app = express();
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(cookieParser());

  app.use(createDBConnection);
  app.use(verifyJwt);

  app.use("/user", userRoute);
  app.use("/wallet", walletRoute);

  app.listen(port, () => {
    console.log("Listening on port ", port);
  });
  console.log(`Worker ${process.pid} started`);
}
