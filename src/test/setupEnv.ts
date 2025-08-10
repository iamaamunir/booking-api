import "reflect-metadata";
import * as dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Set test environment
process.env.NODE_ENV = "test";

// Set default database URL for tests if not provided
if (!process.env.DB_URL) {
  process.env.DB_URL =
    "postgres://postgres:postgres@localhost:5432/rental_booking_test_db";
}

// Global test setup
beforeAll(async () => {
  // Any global setup logic here
});

afterAll(async () => {
  // Force cleanup to avoid hanging processes
  await new Promise((resolve) => setTimeout(resolve, 100));
});
