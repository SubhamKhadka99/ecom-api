"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = void 0;
const env_config_1 = require("../config/env.config");
const enum_types_1 = require("../types/enum.types");
class AppError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        Error.captureStackTrace(this);
    }
}
const error_handler = (error, req, res, next) => {
    const message = error?.message || "Internal server error";
    const statusCode = error?.statusCode || 500;
    const code = error?.code || enum_types_1.ERROR_CODES.INTERNAL_SERVER_ERR;
    const status = error?.status || "error";
    console.log("Error handler");
    console.log(error);
    res.status(statusCode).json({
        message,
        code,
        status,
        data: null,
        originalError: env_config_1.ENV_CONFIG.node_env === "development" ? error.stack : null,
    });
};
exports.error_handler = error_handler;
exports.default = AppError;
