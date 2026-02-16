"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! routing for user
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
//! creating express router instance
const router = express_1.default.Router();
//* get all users
router.get("/", user_controller_1.getAll);
//* get by id
router.get("/:id", user_controller_1.getById);
//* update
router.put("/:id", user_controller_1.update_user);
//* delete
router.delete("/:id", user_controller_1.delete_user);
exports.default = router;
