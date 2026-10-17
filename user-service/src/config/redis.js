
const Redis = require("ioredis");
const { config } = require("./index.js");
const logger = require("./logger.js");

class RedisClient {
  static instance;
  static isConnected = false;

  constructor() {
    // Singleton instance is created through getInstance()
  }

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(config.REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });

      RedisClient.setupEventListeners();
    }

    return RedisClient.instance;
  }

  static setupEventListeners() {
    const redis = RedisClient.instance;

    redis.on("connect", () => {
      logger.info("Redis is connecting...");
    });

    redis.on("ready", () => {
      RedisClient.isConnected = true;
      logger.info("Redis connection is ready");
    });

    redis.on("error", (error) => {
      logger.error("Redis connection error", error);
    });

    redis.on("close", () => {
      RedisClient.isConnected = false;
      logger.warn("Redis connection closed");
    });

    redis.on("reconnecting", (delay) => {
      RedisClient.isConnected = false;
      logger.info(`Redis reconnecting in ${delay}ms`);
    });

    redis.on("end", () => {
      RedisClient.isConnected = false;
      logger.info("Redis connection ended");
    });
  }

  static getConnectionStatus() {
    return RedisClient.isConnected;
  }

  static async disconnect() {
    if (RedisClient.instance) {
      await RedisClient.instance.quit();
      RedisClient.instance = null;
      RedisClient.isConnected = false;
      logger.info("Redis disconnected successfully");
    }
  }
}

module.exports = RedisClient;
