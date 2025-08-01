import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (error.message.includes("not found")) {
    return res.status(404).json({
      message: error.message,
      status: "error",
    });
  }

  if (
    error.message.includes("already exists") ||
    error.message.includes("Invalid credentials") ||
    error.message.includes("End date must be after start date")
  ) {
    return res.status(400).json({
      message: error.message,
      status: "error",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    status: "error",
  });
};
