import { Router } from "express";
import { TouristController } from "../controllers/touristController";
import { authenticateToken, requireEmployee } from "../middleware/auth";
import { validateCreateTourist } from "../middleware/validation";

const touristRouter = Router();
const touristController = new TouristController();

touristRouter.post(
  "/register",
  validateCreateTourist,
  touristController.createTourist
);

touristRouter.use(authenticateToken);
touristRouter.use(requireEmployee);

touristRouter.post("/", validateCreateTourist, touristController.createTourist);
touristRouter.get("/", touristController.getAllTourists);
touristRouter.get("/:id", touristController.getTouristById);
touristRouter.put("/:id", touristController.updateTourist);
touristRouter.delete("/:id", touristController.deleteTourist);

export default touristRouter;
