import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
// import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const baseDir = path.resolve();

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined in environment variables");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [path.join(baseDir, "src/entities/*.{ts,js}")],
  migrations: [path.join(baseDir, "src/migrations/*.{ts,js}")],
  synchronize: false,
  logging: true,
});
