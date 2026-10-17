const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const config = require("./src/config/index.js").config;

const app = express();
// const logger = require("./config/logger");

const { corsMiddleware } = require("./src/middlewares/cors.middleware.js");
const errorHandler = require("./src/middlewares/error.middleware.js");
const reqLogger = require("./src/middlewares/req.middleware.js");

app.use(helmet());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(reqLogger);

app.get("/", (req, res) => {
  res.send("Hello from index.js of user-service");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

server.on("error", (error) => {
  console.error("Error starting server", error);
});
