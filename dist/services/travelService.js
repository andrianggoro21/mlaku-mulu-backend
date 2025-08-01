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
exports.TravelService = void 0;
const travelRepository_1 = require("../repositories/travelRepository");
const touristRepository_1 = require("../repositories/touristRepository");
class TravelService {
    constructor() {
        this.travelRepository = new travelRepository_1.TravelRepository();
        this.touristRepository = new touristRepository_1.TouristRepository();
    }
    createTravel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findById(data.touristId);
            if (!tourist) {
                throw new Error("Tourist not found");
            }
            if (new Date(data.tanggalMulaiPerjalanan) >=
                new Date(data.tanggalBerakhirPerjalanan)) {
                throw new Error("End date must be after start date");
            }
            if (data.tanggalMulaiPerjalanan) {
                data.tanggalMulaiPerjalanan = new Date(data.tanggalMulaiPerjalanan);
            }
            if (data.tanggalBerakhirPerjalanan) {
                data.tanggalBerakhirPerjalanan = new Date(data.tanggalBerakhirPerjalanan);
            }
            return this.travelRepository.create(data);
        });
    }
    getAllTravels() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.travelRepository.findAll();
        });
    }
    getTravelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const travel = yield this.travelRepository.findById(id);
            if (!travel) {
                throw new Error("Travel not found");
            }
            return travel;
        });
    }
    getTravelsByTouristId(touristId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findById(touristId);
            if (!tourist) {
                throw new Error("Tourist not found");
            }
            return this.travelRepository.findByTouristId(touristId);
        });
    }
    updateTravel(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const travel = yield this.travelRepository.findById(id);
            if (!travel) {
                throw new Error("Travel not found");
            }
            if (data.tanggalMulaiPerjalanan && data.tanggalBerakhirPerjalanan) {
                if (new Date(data.tanggalMulaiPerjalanan) >=
                    new Date(data.tanggalBerakhirPerjalanan)) {
                    throw new Error("End date must be after start date");
                }
            }
            if (data.tanggalMulaiPerjalanan) {
                data.tanggalMulaiPerjalanan = new Date(data.tanggalMulaiPerjalanan);
            }
            if (data.tanggalBerakhirPerjalanan) {
                data.tanggalBerakhirPerjalanan = new Date(data.tanggalBerakhirPerjalanan);
            }
            return this.travelRepository.update(id, data);
        });
    }
    deleteTravel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const travel = yield this.travelRepository.findById(id);
            if (!travel) {
                throw new Error("Travel not found");
            }
            return this.travelRepository.delete(id);
        });
    }
}
exports.TravelService = TravelService;
