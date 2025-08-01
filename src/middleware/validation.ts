import { Request, Response, NextFunction } from "express";

export const validateCreateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password, name } = req.body;

  if (!email || !username || !password || !name) {
    return res.status(400).json({
      status: "error",
      message: "Email, username, password, and name are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "error",
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};

export const validateCreateTourist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password, name } = req.body;

  if (!email || !username || !password || !name) {
    return res.status(400).json({
      status: "error",
      message: "Email, username, password, and name are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "error",
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};

export const validateCreateTravel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    touristId,
    tanggalMulaiPerjalanan,
    tanggalBerakhirPerjalanan,
    destinasiPerjalanan,
  } = req.body;

  if (
    !touristId ||
    !tanggalMulaiPerjalanan ||
    !tanggalBerakhirPerjalanan ||
    !destinasiPerjalanan
  ) {
    return res.status(400).json({
      status: "error",
      message: "Tourist ID, start date, end date, and destination are required",
    });
  }

  if (new Date(tanggalMulaiPerjalanan) >= new Date(tanggalBerakhirPerjalanan)) {
    return res.status(400).json({
      status: "error",
      message: "End date must be after start date",
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username and password are required",
    });
  }

  next();
};
