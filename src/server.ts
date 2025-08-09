import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () =>
      console.log(`Server running on port:${PORT}`)
    );
  })
  .catch((error) => console.error("DB connection error:", error));
