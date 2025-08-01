import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Seed admin employee
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.employee.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      email: "admin@mlaku-mulu.com",
      username: "admin",
      password: adminPassword,
      name: "Administrator",
      role: "ADMIN",
    },
  });

  // Seed staff employee
  const staffPassword = await bcrypt.hash("staff123", 12);
  const staff = await prisma.employee.upsert({
    where: { username: "staff1" },
    update: {},
    create: {
      email: "staff1@mlaku-mulu.com",
      username: "staff1",
      password: staffPassword,
      name: "Staff Satu",
      role: "STAFF",
    },
  });

  // Seed sample tourist
  const touristPassword = await bcrypt.hash("tourist123", 12);
  const tourist = await prisma.tourist.upsert({
    where: { username: "tourist1" },
    update: {},
    create: {
      email: "tourist1@example.com",
      username: "tourist1",
      password: touristPassword,
      name: "John Doe",
      phone: "+62812345678",
      address: "Jl. Contoh No. 123, Yogyakarta",
      dateOfBirth: new Date("1990-01-01"),
    },
  });

  // Seed sample travel
  const travel = await prisma.travel.create({
    data: {
      touristId: tourist.id,
      tanggalMulaiPerjalanan: new Date("2024-02-01T08:00:00.000Z"),
      tanggalBerakhirPerjalanan: new Date("2024-02-05T18:00:00.000Z"),
      destinasiPerjalanan: {
        kota: "Bali",
        tempat: ["Pantai Kuta", "Tanah Lot", "Ubud"],
        hotel: "Grand Hyatt Bali",
      },
      notes: "Liburan keluarga ke Bali",
      status: "COMPLETED",
    },
  });

  console.log("Database seeded successfully!");
  console.log("Admin credentials:", {
    username: "admin",
    password: "admin123",
  });
  console.log("Staff credentials:", {
    username: "staff1",
    password: "staff123",
  });
  console.log("Tourist credentials:", {
    username: "tourist1",
    password: "tourist123",
  });
  console.log("Travel:", "success");
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
