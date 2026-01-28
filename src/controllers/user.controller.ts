import { json, NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../middlewares/error_handler.middleware";
import { ERROR_CODES } from "../types/enum.types";

export const getAll = async (req: Request, res: Response) => {
  try {
    // db query -> user collection
    const users = await User.find({});
    //! success response
    res.status(201).json({
      message: "User fetched",
      code: "SUCCESS",
      status: "success",
      data: users,
    });
  } catch (error: any) {
    throw new AppError(
      "INTERNAL_SERVER_ERR",
      ERROR_CODES.INTERNAL_SERVER_ERR,
      400,
    );
  }
};

//! get by id
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new AppError("User not found", ERROR_CODES.NOT_FOUND_ERR, 400);
    }

    res.status(201).json({
      message: "User fetched",
      code: "SUCCESS",
      status: "success",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

//!update
export const update_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body); // firstname lastname phonenumber

    if (!updatedUser) {
      throw new AppError(
        "INTERNAL_SERVER_ERR",
        ERROR_CODES.INTERNAL_SERVER_ERR,
        400,
      );
    }

    res.status(200).json({
      message: "User updated successfully",
      code: "SUCCESS",
      status: "success",
      data: updatedUser,
    });
  } catch (error: any) {
    next(error);
  }
};

//!delete
export const delete_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new AppError("User not found", ERROR_CODES.NOT_FOUND_ERR, 400);
    }

    res.status(200).json({
      message: "User deleted successfully",
      code: "SUCCESS",
      status: "success",
      data: deletedUser,
    });
  } catch (error: any) {
    next(error);
  }
};
