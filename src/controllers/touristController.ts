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
      res.status(200).json({
        status: "success",
        message: "Tourists retrieved successfully",
        data: tourists,
      });
    } catch (error) {
      next(error);
    }
  };

  getTouristById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tourist = await this.touristService.getTouristById(id);
      res.status(200).json({
        status: "success",
        message: "Tourist retrieved successfully",
        data: tourist,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const tourist = await this.touristService.updateTourist(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Tourist updated successfully",
        data: tourist,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTourist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.touristService.deleteTourist(id);
      res.status(200).json({
        status: "success",
        message: "Tourist deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
