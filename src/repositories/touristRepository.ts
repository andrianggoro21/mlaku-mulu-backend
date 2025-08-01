import { Tourist } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateTouristDto, TouristWithoutPassword } from "../types";

export class TouristRepository {
  async create(data: CreateTouristDto): Promise<Tourist> {
    return prisma.tourist.create({
      data,
    });
  }

  async findByUsername(username: string): Promise<Tourist | null> {
    return prisma.tourist.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Tourist | null> {
    return prisma.tourist.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Tourist | null> {
    return prisma.tourist.findUnique({
      where: { id },
      include: {
        travels: true,
      },
    });
  }

  async findAll(): Promise<TouristWithoutPassword[]> {
    return prisma.tourist.findMany({
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
  }

  async update(id: string, data: Partial<CreateTouristDto>): Promise<Tourist> {
    return prisma.tourist.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Tourist> {
    return prisma.tourist.delete({
      where: { id },
    });
  }
}
