import { Employee } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateEmployeeDto, EmployeeWithoutPassword } from "../types";

export class EmployeeRepository {
  async create(data: CreateEmployeeDto): Promise<Employee> {
    return prisma.employee.create({
      data,
    });
  }

  async findByUsername(username: string): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<EmployeeWithoutPassword[]> {
    return prisma.employee.findMany({
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
  }

  async update(
    id: string,
    data: Partial<CreateEmployeeDto>
  ): Promise<Employee> {
    return prisma.employee.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Employee> {
    return prisma.employee.delete({
      where: { id },
    });
  }
}
