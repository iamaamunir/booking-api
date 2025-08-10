// src/config/test-data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Property } from "../entities/property";
import { Booking } from "../entities/booking";
import * as dotenv from "dotenv";
dotenv.config();
// Import other entities explicitly

export const TestDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [Property, Booking], // Explicitly list entities to avoid dynamic import issues
  synchronize: true, // Auto-create tables for testing
  dropSchema: true, // Start with clean DB for each test run - this handles FK constraints
  logging: false, // Reduce noise in tests
});
