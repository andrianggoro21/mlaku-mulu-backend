import { Router } from "express";
import authRouter from "./authRoute";
import { errorHandler } from "../middleware/errorHandler";
import employeeRouter from "./employeeRoute";
import touristRouter from "./touristRoute";

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

mainRouter.use(errorHandler);

export default mainRouter;
