import { Router } from "express";
import authRouter from "./authRoute";
import { errorHandler } from "../middleware/errorHandler";

const mainRouter = Router();

mainRouter.get("/health", (req, res) => {
  res.json({
    message: "Mlaku-Mulu Backend API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

mainRouter.use("/auth", authRouter);

mainRouter.use(errorHandler);

export default mainRouter;
