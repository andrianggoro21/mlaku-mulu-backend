import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  loginEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.loginEmployee(req.body);
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  loginTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.loginTourist(req.body);
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
