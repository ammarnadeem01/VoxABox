import { NextFunction, Request, Response } from "express";
import CustomError from "../Utils/CustomError";
import { error } from "console";

const devErrors = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};

// const castErrorHandler = (err: Error) => {
//   const msg = `Invalid value for ${err.path}: ${err.value}!`;
//   return new CustomError(msg, 400);
// };

const duplicateKeyErrorHandler = (err: any) => {
  const msg = `There is already a user with email ${err.fields.email} . Please use another email!`;

  return new CustomError(msg, 400);
};
const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};
const ForeignKeyConstraintErrorHandler = (err: any) => {
  const msg = `${err.parent.parameters[1]} is not present`;

  return new CustomError(msg, 400);
};
const DatabaseErrorHandler = (err: any) => {
  const msg = err.parent.detail;

  return new CustomError(msg, 400);
};

// const handleExpiredJWT = (err: CustomError) => {
//   const msg = "JWT has been expired. Please login again...";
//   return new CustomError(msg, 401);
// };

// const handleJWTError = (err: CustomError) => {
//   return new CustomError("Invalid Token... Please Login Again...", 401);
// };
const prodErrors = (res: Response, error: CustomError) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error?.parent?.code == "23505") error = duplicateKeyErrorHandler(error);
    if (error.name === "SequelizeValidationError")
      error = validationErrorHandler(error);

    if (error.name === "SequelizeForeignKeyConstraintError")
      error = ForeignKeyConstraintErrorHandler(error);
    if (error.name === "SequelizeDatabaseError")
      error = DatabaseErrorHandler(error);
    // if (error.name === "TokenExpiredError") error = handleExpiredJWT(error);
    // if (error.name === "JsonWebTokenError") error = handleJWTError(error);

    prodErrors(res, error);
  }
};
