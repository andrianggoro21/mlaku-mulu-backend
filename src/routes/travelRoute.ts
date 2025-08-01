import { Router } from "express";
import { TravelController } from "../controllers/travelController";
import {
  authenticateToken,
  requireEmployee,
  requireTourist,
} from "../middleware/auth";
import { validateCreateTravel } from "../middleware/validation";

const travelRouter = Router();
const travelController = new TravelController();

travelRouter.use(authenticateToken);

travelRouter.get("/my-travels", requireTourist, travelController.getMyTravels);

travelRouter.get("/tourist/:touristId", travelController.getTravelsByTouristId);

travelRouter.post(
  "/",
  requireEmployee,
  validateCreateTravel,
  travelController.createTravel
);
travelRouter.get("/", requireEmployee, travelController.getAllTravels);
travelRouter.get("/:id", travelController.getTravelById);
travelRouter.put("/:id", requireEmployee, travelController.updateTravel);
travelRouter.delete("/:id", requireEmployee, travelController.deleteTravel);

export default travelRouter;
