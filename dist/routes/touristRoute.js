"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const touristController_1 = require("../controllers/touristController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const touristRouter = (0, express_1.Router)();
const touristController = new touristController_1.TouristController();
touristRouter.post("/register", validation_1.validateCreateTourist, touristController.createTourist);
touristRouter.use(auth_1.authenticateToken);
touristRouter.use(auth_1.requireEmployee);
touristRouter.post("/", validation_1.validateCreateTourist, touristController.createTourist);
touristRouter.get("/", touristController.getAllTourists);
touristRouter.get("/:id", touristController.getTouristById);
touristRouter.put("/:id", touristController.updateTourist);
touristRouter.delete("/:id", touristController.deleteTourist);
exports.default = touristRouter;
