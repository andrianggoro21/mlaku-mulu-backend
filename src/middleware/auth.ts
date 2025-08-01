import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt";
import { JwtPayload } from "../types";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = JwtUtil.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const requireEmployee = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.type !== "employee") {
    return res.status(403).json({ message: "Employee access required" });
  }
  next();
};

export const requireTourist = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.type !== "tourist") {
    return res.status(403).json({ message: "Tourist access required" });
  }
  next();
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.type !== "employee" || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
