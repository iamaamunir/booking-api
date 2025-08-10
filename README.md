# 🏠 Property Booking API

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **Node.js + TypeScript REST API** for managing **property bookings**, built using [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/), and [PostgreSQL](https://www.postgresql.org/).  

This API allows clients to:
- Book a property within its availability range
- Prevent overlapping bookings
- Validate booking date ranges

---

## 📚 Table of Contents
- [🏠 Property Booking API](#-property-booking-api)
  - [📚 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
  - [Getting Started](#getting-started)

---

## 🚀 Features
✅ Create bookings with **date validation**  
✅ Ensure bookings are within **property availability**  
✅ Prevent **overlapping bookings**  
✅ **Error handling** with proper HTTP status codes  
✅ Swagger-based **API documentation**  

---

## 🛠 Tech Stack
- **Runtime:** Node.js (>= 18.x)
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Validation:** class-validator / class-transformer
- **Documentation:** Swagger (OpenAPI 3.0)

---

## 📂 Project Structure
```bash
src/
 ├── controllers/
 │    └── BookingController.ts
 ├── dtos/
 │    └── CreateBookingDto.ts
 ├── entities/
 │    ├── Booking.ts
 │    └── Property.ts
 ├── migrations/
 ├── routes/
 │    └── bookingRoutes.ts
 ├── services/
 │    └── BookingService.ts
 ├── data-source.ts
 └── index.ts
 ```

## Getting Started

1. . Clone the repo
   ```sh
   git clone git@github.com:iamaamunir/booking-api.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Set up environment variables
   ```sh
    DB_URL=postgresql://username:password@localhost:5432/rental_booking_db?sslmode=disable
    PORT=5500
    NODE_ENV=development
4. Run migrations
   ```sh
   npm run migration:generate -- ./src/migrations/initialdb
   npm run migration:run
5. Start the development server
    ```sh
    npm run start:dev
    ```