"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.update_user = exports.getById = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error_handler.middleware"));
const enum_types_1 = require("../types/enum.types");
const getAll = async (req, res) => {
    try {
        // db query -> user collection
        const users = await user_model_1.default.find({});
        //! success response
        res.status(201).json({
            message: "User fetched",
            code: "SUCCESS",
            status: "success",
            data: users,
        });
    }
    catch (error) {
        throw new error_handler_middleware_1.default("INTERNAL_SERVER_ERR", enum_types_1.ERROR_CODES.INTERNAL_SERVER_ERR, 400);
    }
};
exports.getAll = getAll;
//! get by id
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.default.findOne({ _id: id });
        if (!user) {
            throw new error_handler_middleware_1.default("User not found", enum_types_1.ERROR_CODES.NOT_FOUND_ERR, 400);
        }
        res.status(201).json({
            message: "User fetched",
            code: "SUCCESS",
            status: "success",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
//!update
const update_user = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await user_model_1.default.findByIdAndUpdate(id, req.body); // firstname lastname phonenumber
        if (!updatedUser) {
            throw new error_handler_middleware_1.default("INTERNAL_SERVER_ERR", enum_types_1.ERROR_CODES.INTERNAL_SERVER_ERR, 400);
        }
        res.status(200).json({
            message: "User updated successfully",
            code: "SUCCESS",
            status: "success",
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.update_user = update_user;
//!delete
const delete_user = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await user_model_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new error_handler_middleware_1.default("User not found", enum_types_1.ERROR_CODES.NOT_FOUND_ERR, 400);
        }
        res.status(200).json({
            message: "User deleted successfully",
            code: "SUCCESS",
            status: "success",
            data: deletedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.delete_user = delete_user;
