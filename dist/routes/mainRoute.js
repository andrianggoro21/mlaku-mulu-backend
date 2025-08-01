"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../middleware/errorHandler");
const authRoute_1 = __importDefault(require("./authRoute"));
const employeeRoute_1 = __importDefault(require("./employeeRoute"));
const touristRoute_1 = __importDefault(require("./touristRoute"));
const travelRoute_1 = __importDefault(require("./travelRoute"));
const mainRouter = (0, express_1.Router)();
mainRouter.get("/health", (req, res) => {
    res.json({
        message: "Mlaku-Mulu Backend API is running!",
        status: "success",
        timestamp: new Date().toISOString(),
    });
});
mainRouter.use("/auth", authRoute_1.default);
mainRouter.use("/employees", employeeRoute_1.default);
mainRouter.use("/tourists", touristRoute_1.default);
mainRouter.use("/travels", travelRoute_1.default);
mainRouter.use(errorHandler_1.notFoundHandler);
mainRouter.use(errorHandler_1.errorHandler);
exports.default = mainRouter;
