"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! routing for auth
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
//! multer uploader
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.uploader)();
//* register
router.post("/register", upload.single("profile_image"), auth_controller_1.register);
//* Login
router.post("/login", auth_controller_1.login);
//* Verify OTP
router.post("/verify-otp", auth_controller_1.verifyOtp);
exports.default = router;
