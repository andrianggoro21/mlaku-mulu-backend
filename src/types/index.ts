import { Role } from "@prisma/client";

export interface CreateEmployeeDto {
  email: string;
  username: string;
  password: string;
  name: string;
  role?: "ADMIN" | "STAFF";
}

export interface CreateTouristDto {
  email: string;
  username: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
}

export interface CreateTravelDto {
  touristId: string;
  tanggalMulaiPerjalanan: Date;
  tanggalBerakhirPerjalanan: Date;
  destinasiPerjalanan: any;
  notes?: string;
}

export interface UpdateTravelDto {
  tanggalMulaiPerjalanan?: Date;
  tanggalBerakhirPerjalanan?: Date;
  destinasiPerjalanan?: any;
  notes?: string;
  status?: "PLANNED" | "ONGOING" | "COMPLETED" | "CANCELLED";
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  username: string;
  role?: string;
  type: "employee" | "tourist";
}

export interface EmployeeWithoutPassword {
  id: string;
  email: string;
  username: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface TouristWithoutPassword {
  id: string;
  email: string;
  username: string;
  name: string;
  phone: string | null;
  address: string | null;
  dateOfBirth: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
