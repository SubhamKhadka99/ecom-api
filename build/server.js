"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// npm init -y
// npx tsc --init
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const env_config_1 = require("./config/env.config");
//! importing routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const error_handler_middleware_1 = __importStar(require("./middlewares/error_handler.middleware"));
const enum_types_1 = require("./types/enum.types");
const app = (0, express_1.default)();
const PORT = env_config_1.ENV_CONFIG.port || 8000;
//! connect to database
(0, db_config_1.connectDB)();
//! using middleware
app.use(express_1.default.json({ limit: "10mb" })); //parse req body json data
app.use("/uploads", express_1.default.static("uploads/"));
// ! using routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
//! root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up and running",
    });
});
//! path not found error
app.use((req, res, next) => {
    const message = `can not  ${req.method} on ${req.url}`;
    const error = new error_handler_middleware_1.default(message, enum_types_1.ERROR_CODES.NOT_FOUND_ERR, 404);
    next(error);
});
// listen
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
//! error handler middleware
app.use(error_handler_middleware_1.error_handler);
