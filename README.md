# 🧳 Mlaku-Mulu Backend API

Backend API untuk Biro Perjalanan Mlaku-Mulu - Sistem manajemen turis dan perjalanan

## 🚀 Quick Start

### Prerequisites
- Node.js
- MySQL Database
- npm atau yarn

### Installation

1. **Clone dan Setup Project**
```bash
git clone <repository-url>
cd mlaku-mulu-backend
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env file dengan konfigurasi database Anda
```

3. **Setup Database**
```bash
npx prisma generate
npx prisma db push / npx prisma migrate dev
npm run db:seed  # Optional: untuk data sample
```

4. **Run Application**
```bash
npm run dev  # Development mode
# atau
npm run build && npm start  # Production mode
```

Server akan berjalan di `http://localhost:8000`

## 📋 Environment Variables

```env
DATABASE_URL="mysql://username:password@localhost:3306/mlaku_mulu_db"
PORT=8000
NODE_ENV="development"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
```

## 🔐 Default Login Credentials

Setelah menjalankan seeding:

**Admin:**
- Username: `admin`
- Password: `admin123`

**Staff:**
- Username: `staff1`
- Password: `staff123`

**Tourist:**
- Username: `tourist1`
- Password: `tourist123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/employee/login` - Login employee
- `POST /api/auth/tourist/login` - Login tourist

### Employee Management (Admin Only)
- `POST /api/employees` - Create employee
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Tourist Management (Employee Only)
- `POST /api/tourists/register` - Tourist self registration (Public)
- `POST /api/tourists` - Create tourist (Employee)
- `GET /api/tourists` - Get all tourists
- `GET /api/tourists/:id` - Get tourist by ID
- `PUT /api/tourists/:id` - Update tourist
- `DELETE /api/tourists/:id` - Delete tourist

### Travel Management
- `POST /api/travels` - Create travel (Employee)
- `GET /api/travels` - Get all travels (Employee)
- `GET /api/travels/:id` - Get travel by ID
- `GET /api/travels/my-travels` - Get my travels (Tourist)
- `GET /api/travels/tourist/:touristId` - Get travels by tourist ID
- `PUT /api/travels/:id` - Update travel (Employee)
- `DELETE /api/travels/:id` - Delete travel (Employee)

## 🏗️ Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Authentication & validation
├── repositories/    # Data access layer
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Helper functions
└── app.ts           # Application entry point
```

## 👥 User Roles

### Employee (Staff)
- ✅ Mengelola data turis (CRUD)
- ✅ Mengelola perjalanan turis (CRUD)
- ✅ Melihat semua data turis dan perjalanan

### Employee (Admin)
- ✅ Semua akses Staff
- ✅ Mengelola data employee (CRUD)

### Tourist
- ✅ Login ke sistem
- ✅ Melihat riwayat perjalanan sendiri
- ✅ Registrasi akun baru

## 📊 Database Schema

### Employees
- id, email, username, password, name, role, timestamps

### Tourists  
- id, email, username, password, name, phone, address, dateOfBirth, timestamps

### Travels
- id, touristId, tanggalMulaiPerjalanan, tanggalBerakhirPerjalanan, destinasiPerjalanan, notes, status, timestamps

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🔧 Tech Stack

- **Framework:** Express.js + TypeScript
- **Database:** MySQL + Prisma ORM
- **Authentication:** JWT + bcrypt
- **Validation:** Custom middleware
- **Security:** Helmet + CORS

## 📞 Health Check

Cek status aplikasi:
```bash
GET /health
```

Response:
```json
{
  "message": "Mlaku-Mulu Backend API is running!",
  "status": "success",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Dibuat dengan ❤️ untuk Biro Perjalanan Mlaku-Mulu**