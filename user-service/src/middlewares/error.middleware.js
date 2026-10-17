const { AppError } = require("../utils/error");

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.code,
      message: err.message,
    });
  }
  console.log("UNHANDLED ERROR", err);
};
