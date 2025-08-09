import pkg from "pg";
const { Pool } = pkg;
import * as fs from "fs";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();
import { AppDataSource } from "../config/data-source.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)
await AppDataSource.initialize();
console.log("Database connection established");

const databaseUrl = process.env.DB_URL;
const pool = new Pool({
  connectionString: databaseUrl,
});

if (process.env.NODE_ENV === "development") {
  let seedQuery = fs.readFileSync(`${__dirname}/property.seed.sql`, "utf8");
  pool.query(seedQuery, (err: Error, res: any) => {
    console.log(err, res);
    console.log("Seeding Completed!");
    pool.end();
  });
}
