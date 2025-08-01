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
exports.EmployeeRepository = void 0;
const database_1 = require("../config/database");
class EmployeeRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.create({
                data,
            });
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.findUnique({
                where: { username },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.findUnique({
                where: { email },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.findUnique({
                where: { id },
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.findMany({
                select: {
                    id: true,
                    email: true,
                    username: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.update({
                where: { id },
                data,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.employee.delete({
                where: { id },
            });
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;
