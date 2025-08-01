import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import {
  authenticateToken,
  requireEmployee,
  requireAdmin,
} from "../middleware/auth";
import { validateCreateEmployee } from "../middleware/validation";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.use(authenticateToken);
employeeRouter.use(requireEmployee);

employeeRouter.post(
  "/",
  requireAdmin,
  validateCreateEmployee,
  employeeController.createEmployee
);
employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get("/:id", employeeController.getEmployeeById);
employeeRouter.put("/:id", requireAdmin, employeeController.updateEmployee);
employeeRouter.delete("/:id", requireAdmin, employeeController.deleteEmployee);

export default employeeRouter;
