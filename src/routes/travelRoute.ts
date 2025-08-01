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

travelRouter.use(requireEmployee);

travelRouter.get("/tourist/:touristId", travelController.getTravelsByTouristId);
travelRouter.post("/", validateCreateTravel, travelController.createTravel);
travelRouter.get("/", travelController.getAllTravels);
travelRouter.get("/:id", travelController.getTravelById);
travelRouter.put("/:id", travelController.updateTravel);
travelRouter.delete("/:id", travelController.deleteTravel);

export default travelRouter;
