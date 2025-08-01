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
exports.AuthService = void 0;
const employeeRepository_1 = require("../repositories/employeeRepository");
const touristRepository_1 = require("../repositories/touristRepository");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
class AuthService {
    constructor() {
        this.employeeRepository = new employeeRepository_1.EmployeeRepository();
        this.touristRepository = new touristRepository_1.TouristRepository();
    }
    loginEmployee(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findByUsername(loginData.username);
            if (!employee) {
                throw new Error("Invalid credentials");
            }
            const isValidPassword = yield password_1.PasswordUtil.compare(loginData.password, employee.password);
            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }
            const token = jwt_1.JwtUtil.sign({
                id: employee.id,
                username: employee.username,
                role: employee.role,
                type: "employee",
            });
            return {
                token,
                user: {
                    id: employee.id,
                    username: employee.username,
                    email: employee.email,
                    name: employee.name,
                    role: employee.role,
                },
            };
        });
    }
    loginTourist(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findByUsername(loginData.username);
            if (!tourist) {
                throw new Error("Invalid credentials");
            }
            const isValidPassword = yield password_1.PasswordUtil.compare(loginData.password, tourist.password);
            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }
            const token = jwt_1.JwtUtil.sign({
                id: tourist.id,
                username: tourist.username,
                type: "tourist",
            });
            return {
                token,
                user: {
                    id: tourist.id,
                    username: tourist.username,
                    email: tourist.email,
                    name: tourist.name,
                },
            };
        });
    }
}
exports.AuthService = AuthService;
