import { Request, Response, NextFunction } from "express";
import { TravelService } from "../services/travelService";
import { JwtPayload } from "../types";


interface AuthRequest extends Request {
  user?: JwtPayload;
}

export class TravelController {
  private travelService: TravelService;

  constructor() {
    this.travelService = new TravelService();
  }

  createTravel = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const travel = await this.travelService.createTravel(req.body);
      res.status(201).json({
        message: "Travel created successfully",
        data: travel,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTravels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const travels = await this.travelService.getAllTravels();
      res.json({
        message: "Travels retrieved successfully",
        data: travels,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getTravelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const travel = await this.travelService.getTravelById(id);
      res.json({
        message: "Travel retrieved successfully",
        data: travel,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getTravelsByTouristId = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { touristId } = req.params;
      if (req.user?.type === "tourist" && req.user.id !== touristId) {
        return res.status(403).json({
          message: "You can only view your own travels",
          status: "error",
        });
      }

      const travels = await this.travelService.getTravelsByTouristId(touristId);
      res.json({
        message: "Travels retrieved successfully",
        data: travels,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getMyTravels = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user || req.user.type !== "tourist") {
        return res.status(403).json({
          message: "Tourist access required",
          status: "error",
        });
      }

      const travels = await this.travelService.getTravelsByTouristId(
        req.user.id
      );
      res.json({
        message: "Your travels retrieved successfully",
        data: travels,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateTravel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const travel = await this.travelService.updateTravel(id, req.body);
      res.json({
        message: "Travel updated successfully",
        data: travel,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTravel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.travelService.deleteTravel(id);
      res.json({
        message: "Travel deleted successfully",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };
}
