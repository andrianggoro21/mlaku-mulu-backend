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
exports.EmployeeController = void 0;
const employeeService_1 = require("../services/employeeService");
class EmployeeController {
    constructor() {
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.createEmployee(req.body);
                res.status(201).json({
                    status: "success",
                    message: "Employee created successfully",
                    data: employee,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllEmployees = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getAllEmployees();
                res.status(200).json({
                    status: "success",
                    message: "Employees retrieved successfully",
                    data: employees,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield this.employeeService.getEmployeeById(id);
                res.status(200).json({
                    status: "success",
                    message: "Employee retrieved successfully",
                    data: employee,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield this.employeeService.updateEmployee(id, req.body);
                res.status(200).json({
                    status: "success",
                    message: "Employee updated successfully",
                    data: employee,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.employeeService.deleteEmployee(id);
                res.status(200).json({
                    status: "success",
                    message: "Employee deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.employeeService = new employeeService_1.EmployeeService();
    }
}
exports.EmployeeController = EmployeeController;
