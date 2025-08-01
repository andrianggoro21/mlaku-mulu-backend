import { EmployeeRepository } from "../repositories/employeeRepository";
import { PasswordUtil } from "../utils/password";
import { CreateEmployeeDto } from "../types";

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async createEmployee(data: CreateEmployeeDto) {
    const existingEmployee = await this.employeeRepository.findByUsername(
      data.username
    );
    if (existingEmployee) {
      throw new Error("Username already exists");
    }

    const existingEmail = await this.employeeRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await PasswordUtil.hash(data.password);
    const employee = await this.employeeRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...employeeWithoutPassword } = employee;
    return employeeWithoutPassword;
  }

  async getAllEmployees() {
    return this.employeeRepository.findAll();
  }

  async getEmployeeById(id: string) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    const { password, ...employeeWithoutPassword } = employee;
    return employeeWithoutPassword;
  }

  async updateEmployee(id: string, data: Partial<CreateEmployeeDto>) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    if (data.password) {
      data.password = await PasswordUtil.hash(data.password);
    }

    const updatedEmployee = await this.employeeRepository.update(id, data);
    const { password, ...employeeWithoutPassword } = updatedEmployee;
    return employeeWithoutPassword;
  }

  async deleteEmployee(id: string) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    return this.employeeRepository.delete(id);
  }
}
