"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelController = void 0;
const travelService_1 = require("../services/travelService");
class TravelController {
    constructor() {
        this.createTravel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const travel = yield this.travelService.createTravel(req.body);
                res.status(201).json({
                    status: "success",
                    message: "Travel created successfully",
                    data: travel,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllTravels = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const travels = yield this.travelService.getAllTravels();
                res.status(200).json({
                    status: "success",
                    message: "Travels retrieved successfully",
                    data: travels,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTravelById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const travel = yield this.travelService.getTravelById(id);
                res.status(200).json({
                    status: "success",
                    message: "Travel retrieved successfully",
                    data: travel,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTravelsByTouristId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { touristId } = req.params;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.type) === "tourist" && req.user.id !== touristId) {
                    return res.status(403).json({
                        status: "error",
                        message: "You can only view your own travels",
                    });
                }
                const travels = yield this.travelService.getTravelsByTouristId(touristId);
                res.status(200).json({
                    status: "success",
                    message: "Travels retrieved successfully",
                    data: travels,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getMyTravels = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || req.user.type !== "tourist") {
                    return res.status(403).json({
                        status: "error",
                        message: "Tourist access required",
                    });
                }
                const travels = yield this.travelService.getTravelsByTouristId(req.user.id);
                res.status(200).json({
                    status: "success",
                    message: "Your travels retrieved successfully",
                    data: travels,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTravel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const travel = yield this.travelService.updateTravel(id, req.body);
                res.status(200).json({
                    status: "success",
                    message: "Travel updated successfully",
                    data: travel,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTravel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.travelService.deleteTravel(id);
                res.status(200).json({
                    status: "success",
                    message: "Travel deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.travelService = new travelService_1.TravelService();
    }
}
exports.TravelController = TravelController;
