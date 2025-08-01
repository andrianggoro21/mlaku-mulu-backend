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
exports.TravelRepository = void 0;
const database_1 = require("../config/database");
class TravelRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.create({
                data,
                include: {
                    tourist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.findUnique({
                where: { id },
                include: {
                    tourist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
        });
    }
    findByTouristId(touristId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.findMany({
                where: { touristId },
                orderBy: { tanggalMulaiPerjalanan: "desc" },
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.findMany({
                include: {
                    tourist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.update({
                where: { id },
                data,
                include: {
                    tourist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.travel.delete({
                where: { id },
            });
        });
    }
}
exports.TravelRepository = TravelRepository;
