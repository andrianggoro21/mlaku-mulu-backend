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
      res.json({
        message: "Login successful",
        data: result,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  loginTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.loginTourist(req.body);
      res.json({
        message: "Login successful",
        data: result,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };
}
