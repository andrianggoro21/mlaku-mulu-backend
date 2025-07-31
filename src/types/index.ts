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
