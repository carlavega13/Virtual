const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./Routes/index");
const cors = require("cors");
const sendEventReminder = require("./utils/sendEventReminder");
const server = express();
const cron = require('node-cron');

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
cron.schedule('50 14 * * *', () => {
  sendEventReminder();
});

server.use("/", router);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

module.exports = server;
