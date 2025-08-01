import { Request, Response, NextFunction } from "express";
import { TouristService } from "../services/touristService";

export class TouristController {
  private touristService: TouristService;

  constructor() {
    this.touristService = new TouristService();
  }

  createTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tourist = await this.touristService.createTourist(req.body);
      res.status(201).json({
        message: "Tourist created successfully",
        data: tourist,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTourists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tourists = await this.touristService.getAllTourists();
      res.json({
        message: "Tourists retrieved successfully",
        data: tourists,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getTouristById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tourist = await this.touristService.getTouristById(id);
      res.json({
        message: "Tourist retrieved successfully",
        data: tourist,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tourist = await this.touristService.updateTourist(id, req.body);
      res.json({
        message: "Tourist updated successfully",
        data: tourist,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.touristService.deleteTourist(id);
      res.json({
        message: "Tourist deleted successfully",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };
}
