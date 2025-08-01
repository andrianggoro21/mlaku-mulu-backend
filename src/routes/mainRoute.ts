import { Router } from "express";
import { errorHandler, notFoundHandler } from "../middleware/errorHandler";
import authRouter from "./authRoute";
import employeeRouter from "./employeeRoute";
import touristRouter from "./touristRoute";
import travelRouter from "./travelRoute";

const mainRouter = Router();

mainRouter.get("/health", (req, res) => {
  res.json({
    message: "Mlaku-Mulu Backend API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/employees", employeeRouter);
mainRouter.use("/tourists", touristRouter);
mainRouter.use("/travels", travelRouter);

mainRouter.use(notFoundHandler);
mainRouter.use(errorHandler);

export default mainRouter;
