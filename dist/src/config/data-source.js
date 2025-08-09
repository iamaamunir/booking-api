import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    // entities: [__dirname + "/entities/*.{ts,js}"],
    // entities: [],
    // migrations: [__dirname + "/migrations/*.{ts,js}"],
    // synchronize: false,
    // logging: true,
});
//# sourceMappingURL=data-source.js.map