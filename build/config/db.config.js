"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
const connectDB = () => {
    mongoose_1.default
        .connect(env_config_1.ENV_CONFIG.db_uri, {
        dbName: env_config_1.ENV_CONFIG.db_name,
        autoCreate: true,
    })
        .then(() => {
        console.log("database connected");
    })
        .catch((error) => {
        console.log("----------Database connection error------------");
        console.log(error);
    });
};
exports.connectDB = connectDB;
// api keys
// security keys / secret
