import { EmployeeRepository } from "../repositories/employeeRepository";
import { TouristRepository } from "../repositories/touristRepository";
import { LoginDto } from "../types";
import { JwtUtil } from "../utils/jwt";
import { PasswordUtil } from "../utils/password";

export class AuthService {
  private employeeRepository: EmployeeRepository;
  private touristRepository: TouristRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.touristRepository = new TouristRepository();
  }

  async loginEmployee(loginData: LoginDto) {
    const employee = await this.employeeRepository.findByUsername(
      loginData.username
    );
    if (!employee) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await PasswordUtil.compare(
      loginData.password,
      employee.password
    );
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = JwtUtil.sign({
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
  }

  async loginTourist(loginData: LoginDto) {
    const tourist = await this.touristRepository.findByUsername(
      loginData.username
    );
    if (!tourist) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await PasswordUtil.compare(
      loginData.password,
      tourist.password
    );
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = JwtUtil.sign({
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
  }
}
