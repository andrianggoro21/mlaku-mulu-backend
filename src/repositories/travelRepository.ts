import { Travel } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateTravelDto, UpdateTravelDto } from "../types";

export class TravelRepository {
  async create(data: CreateTravelDto): Promise<Travel> {
    return prisma.travel.create({
      data,
      include: {
        tourist: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Travel | null> {
    return prisma.travel.findUnique({
      where: { id },
      include: {
        tourist: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByTouristId(touristId: string): Promise<Travel[]> {
    return prisma.travel.findMany({
      where: { touristId },
      orderBy: { tanggalMulaiPerjalanan: "desc" },
    });
  }

  async findAll(): Promise<Travel[]> {
    return prisma.travel.findMany({
      include: {
        tourist: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: UpdateTravelDto): Promise<Travel> {
    return prisma.travel.update({
      where: { id },
      data,
      include: {
        tourist: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<Travel> {
    return prisma.travel.delete({
      where: { id },
    });
  }
}
