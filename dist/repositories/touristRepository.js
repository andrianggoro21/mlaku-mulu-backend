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
exports.TouristRepository = void 0;
const database_1 = require("../config/database");
class TouristRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.create({
                data,
            });
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.findUnique({
                where: { username },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.findUnique({
                where: { email },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.findUnique({
                where: { id },
                include: {
                    travels: true,
                },
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.findMany({
                select: {
                    id: true,
                    email: true,
                    username: true,
                    name: true,
                    phone: true,
                    address: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.update({
                where: { id },
                data,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.tourist.delete({
                where: { id },
            });
        });
    }
}
exports.TouristRepository = TouristRepository;
