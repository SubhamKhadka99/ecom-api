import { Request, Response } from "express";
import User from "../models/user.model";
import { compareHash, hashText } from "../utils/bcrypt.utils";
import { hash } from "bcryptjs";

//! register
export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    if (!first_name) {
      res.status(400).json({
        message: "first_name is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }
    if (!last_name) {
      res.status(400).json({
        message: "last_name is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }
    if (!email) {
      res.status(400).json({
        message: "email is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }
    if (!password) {
      res.status(400).json({
        message: "password is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }

    // create user
    // const user = await User.create({})
    const user = new User({ first_name, last_name, email, password, phone });

    // password hash
    const hash_password = await hashText(password);
    user.password = hash_password;
    // profile image
    // otp
    //! save user
    await user.save();

    //! success response
    res.status(201).json({
      message: "Account created",
      code: "SUCCESS",
      status: "success",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      code: "INTEENAL_SERVER_ERR",
      status: "error",
      data: null,
    });
  }
};

//! login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({
        message: "email is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }
    if (!password) {
      res.status(400).json({
        message: "password is required",
        code: "VALIDATION_ERR",
        status: "error",
        data: null,
      });
    }

    // get user by email

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        message: "email or password doesn't match",
        code: "NOT_FOUND_ERR",
        status: "fail",
        data: null,
      });
      return;
    }
    console.log(user);

    //? compare password
    const is_pass_match = await compareHash(password, user.password);
    if (!is_pass_match) {
      res.status(404).json({
        message: "email or password does not match",
        code: "NOT_FOUND_ERR",
        status: "fail",
        data: null,
      });
      return;
    }
    //! success response
    res.status(201).json({
      message: "Login Successful!",
      code: "SUCCESS",
      status: "success",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      code: "INTEENAL_SERVER_ERR",
      status: "error",
      data: null,
    });
  }
};
