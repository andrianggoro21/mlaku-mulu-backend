import { Request, Response, NextFunction } from "express";
import { EmployeeService } from "../services/employeeService";

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await this.employeeService.createEmployee(req.body);
      res.status(201).json({
        message: "Employee created successfully",
        data: employee,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.employeeService.getAllEmployees();
      res.status(200).json({
        status: "success",
        message: "Employees retrieved successfully",
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.getEmployeeById(id);
      res.status(200).json({
        status: "success",
        message: "Employee retrieved successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.updateEmployee(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Employee updated successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.employeeService.deleteEmployee(id);
      res.status(200).json({
        status: "success",
        message: "Employee deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
