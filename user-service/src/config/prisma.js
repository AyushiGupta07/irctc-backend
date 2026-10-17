const { PrismaClient } = require("@prisma/client");
const { config } = require("./index.js");
const logger = require("./logger.js");
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({});

if(config.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}

module.exports = prisma;
