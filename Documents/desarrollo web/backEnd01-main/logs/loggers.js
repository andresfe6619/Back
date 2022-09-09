import winston from "winston"
import dotenv from "dotenv"
dotenv.config({path: ".env"});
const buildProdLogger = () => {
    const prodLogger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: "logs/warnings.log", level: "warn", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
        new winston.transports.File({ filename: "logs/errors.log", level: "error", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
      ],
    });
  
    return prodLogger;
  };
  
  const buildDevLogger = () => {
    const devLogger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: "logs/warnings.log", level: "warn", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
        new winston.transports.File({ filename: "logs/errors.log", level: "error", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
        new winston.transports.Console({ level: "info", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) })
      ],
    });
  
    return devLogger;
  };
  
  let logger;
  
  if (process.NODE_ENV && process.NODE_ENV.toLocaleUpperCase() === "PRODUCTION") {
    logger = buildProdLogger();
  } else {
    logger = buildDevLogger();
  }

  export {logger}