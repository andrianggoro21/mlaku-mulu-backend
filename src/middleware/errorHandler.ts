import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    status: "error",
    message: error.message,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
  });
};
