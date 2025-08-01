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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const employeeRepository_1 = require("../repositories/employeeRepository");
const password_1 = require("../utils/password");
class EmployeeService {
    constructor() {
        this.employeeRepository = new employeeRepository_1.EmployeeRepository();
    }
    createEmployee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findByUsername(data.username);
            if (existingEmployee) {
                throw new Error("Username already exists");
            }
            const existingEmail = yield this.employeeRepository.findByEmail(data.email);
            if (existingEmail) {
                throw new Error("Email already exists");
            }
            const hashedPassword = yield password_1.PasswordUtil.hash(data.password);
            const employee = yield this.employeeRepository.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const { password } = employee, employeeWithoutPassword = __rest(employee, ["password"]);
            return employeeWithoutPassword;
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findAll();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            const { password } = employee, employeeWithoutPassword = __rest(employee, ["password"]);
            return employeeWithoutPassword;
        });
    }
    updateEmployee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            if (data.password) {
                data.password = yield password_1.PasswordUtil.hash(data.password);
            }
            const updatedEmployee = yield this.employeeRepository.update(id, data);
            const { password } = updatedEmployee, employeeWithoutPassword = __rest(updatedEmployee, ["password"]);
            return employeeWithoutPassword;
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            return this.employeeRepository.delete(id);
        });
    }
}
exports.EmployeeService = EmployeeService;
