import httpStatus from "http-status";
import { Response } from "express";
import { ZodError } from "zod";

type CustomError = {
  statusCode?: number;
  message: string;
  errors?: {
    field?: string;
    message: string;
  }[];
};

export const sendErrorResponse = (
  res: Response,
  error: ZodError | CustomError,
) => {
  // Zod Error
  if (error instanceof ZodError) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Validation Error",
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // Custom Error
  return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
  });
};
