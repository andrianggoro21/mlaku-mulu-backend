import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed admin employee
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.employee.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      email: 'admin@mlaku-mulu.com',
      username: 'admin',
      password: adminPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  });

  // Seed staff employee
  const staffPassword = await bcrypt.hash('staff123', 12);
  const staff = await prisma.employee.upsert({
    where: { username: 'staff1' },
    update: {},
    create: {
      email: 'staff1@mlaku-mulu.com',
      username: 'staff1',
      password: staffPassword,
      name: 'Staff Satu',
      role: 'STAFF',
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin credentials:', { username: 'admin', password: 'admin123' });
  console.log('Staff credentials:', { username: 'staff1', password: 'staff123' });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });