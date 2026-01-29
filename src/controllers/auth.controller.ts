import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { compareHash, hashText } from "../utils/bcrypt.utils";
import { hash } from "bcryptjs";
import AppError from "../middlewares/error_handler.middleware";
import { ERROR_CODES } from "../types/enum.types";
import { upload } from "../utils/cloudinary.utils";
import { createOtp } from "../utils/otp.utils";


const dir ="/profile_images"
//! register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    const file = req.file;
    console.log(file)
    if (!first_name) {
      throw new AppError(
        "first_name is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }
    if (!last_name) {
      throw new AppError(
        "last_name is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }
    if (!email) {
      throw new AppError("email is required", ERROR_CODES.VALIDATION_ERR, 400);
    }
    if (!password) {
      throw new AppError(
        "password is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    // create user
    // const user = await User.create({})
    const user = new User({ first_name, last_name, email, password, phone });

    // password hash
    const hash_password = await hashText(password);
    user.password = hash_password;

    // profile image
    if (file){
    //upload image to cloudinary
    const {path,public_id} = await upload(file,dir);
    //* save image
    user.profile_image={
      path: path ,
      public_id : public_id
    }
    }
    // otp
    const otp = createOtp()

    console.log(otp)
    const otp_hash = await hashText(otp);
    user.otp_hash = otp_hash
    //? save user
    await user.save();

    const otp_expiry = new Date(Date.now()+ 10*60*1000)
    user.otp_hash = otp_hash
    user.otp_expiry = otp_expiry

    //? success response
    res.status(201).json({
      message: "Account created",
      code: "SUCCESS",
      status: "success",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

//! login
export const login = async (req: Request, res: Response , next :NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new AppError("email is required", ERROR_CODES.VALIDATION_ERR, 400);
    }
    if (!password) {
      throw new AppError(
        "password is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    // get user by email

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError(
        "email or password doesn't match",
        ERROR_CODES.AUTH_ERR,
        400,
      );
    }
    console.log(user);

    //? compare password
    const is_pass_match = await compareHash(password, user.password);
    if (!is_pass_match) {
      throw new AppError(
        "email or password doesn't match",
        ERROR_CODES.AUTH_ERR,
        400,
      );
    }

    //? success response
    res.status(201).json({
      message: "Login Successful!",
      code: "SUCCESS",
      status: "success",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};


//verify otp

export const verifyOtp = async (req:Request,res:Response,next:NextFunction)=>{

  try {

    // otp , email <= req.body
    // find user by email
    // compare otp
    // opt => doest match => error
    // check opt expiry
    // if expired => error
    // update user
    // user.opt.hash = undefined
    // user.otp_expiry = undefined
    // user.is_verified = true
    // await user.save
    // success response
    
  } catch (error) {
    next(error)
  }

}

// resend otp