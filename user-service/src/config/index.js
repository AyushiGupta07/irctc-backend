const dotenv = require('dotenv');
dotenv.config();

const config = {
    SERVICE_NAME : require("../../package.json").name,
    PORT:Number(process.env.PORT)|| 4001,
    NODE_ENV:process.env.NODE_ENV || "development",
    ALLOWED_ORIGINS:process.env.ALLOWED_ORIGINS || "http://localhost:3000",
    JWT_SECRET:process.env.JWT_SECRET || "default_secret",
    REDIS_URL:process.env.REDIS_URL || "redis://irctcpass@redis:6379",

}

module.exports = { config };