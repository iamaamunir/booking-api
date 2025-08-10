// src/config/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const baseDir = path.resolve();

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined in environment variables");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [path.join(baseDir, "src/entities/*.{ts,js}")],
  migrations: [path.join(baseDir, "src/migrations/*.{ts,js}")],
  // schema: "public",
  synchronize: false,
  logging: false,
});
