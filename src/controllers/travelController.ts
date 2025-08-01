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
        status: "success",
        message: "Travel created successfully",
        data: travel,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTravels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const travels = await this.travelService.getAllTravels();
      res.status(200).json({
        status: "success",
        message: "Travels retrieved successfully",
        data: travels,
      });
    } catch (error) {
      next(error);
    }
  };

  getTravelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const travel = await this.travelService.getTravelById(id);
      res.status(200).json({
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
          status: "error",
          message: "You can only view your own travels",
        });
      }

      const travels = await this.travelService.getTravelsByTouristId(touristId);
      res.status(200).json({
        status: "success",
        message: "Travels retrieved successfully",
        data: travels,
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
          status: "error",
          message: "Tourist access required",
        });
      }

      const travels = await this.travelService.getTravelsByTouristId(
        req.user.id
      );
      res.status(200).json({
        status: "success",
        message: "Your travels retrieved successfully",
        data: travels,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTravel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const travel = await this.travelService.updateTravel(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Travel updated successfully",
        data: travel,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTravel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.travelService.deleteTravel(id);
      res.status(200).json({
        status: "success",
        message: "Travel deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
