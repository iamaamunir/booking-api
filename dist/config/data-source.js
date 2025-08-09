import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [], // Add your entities here later
    migrations: [], // Add your migrations here later
    synchronize: process.env.NODE_ENV === "development", // Auto-create tables in dev
    logging: process.env.NODE_ENV === "development", // Log queries in dev
});
//# sourceMappingURL=data-source.js.map