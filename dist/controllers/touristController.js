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
exports.TouristController = void 0;
const touristService_1 = require("../services/touristService");
class TouristController {
    constructor() {
        this.createTourist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tourist = yield this.touristService.createTourist(req.body);
                res.status(201).json({
                    status: "success",
                    message: "Tourist created successfully",
                    data: tourist,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllTourists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tourists = yield this.touristService.getAllTourists();
                res.status(200).json({
                    status: "success",
                    message: "Tourists retrieved successfully",
                    data: tourists,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTouristById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tourist = yield this.touristService.getTouristById(id);
                res.status(200).json({
                    status: "success",
                    message: "Tourist retrieved successfully",
                    data: tourist,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTourist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tourist = yield this.touristService.updateTourist(id, req.body);
                res.status(200).json({
                    status: "success",
                    message: "Tourist updated successfully",
                    data: tourist,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTourist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.touristService.deleteTourist(id);
                res.status(200).json({
                    status: "success",
                    message: "Tourist deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.touristService = new touristService_1.TouristService();
    }
}
exports.TouristController = TouristController;
