import "reflect-metadata";
import express, { ErrorRequestHandler } from "express";
import propertyRouter from "./routes/property.route";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import YAML from "yamljs";
import path from "path";
import bookingRouter from "./routes/booking.route";



const baseDir = path.resolve();
const swaggerDocument = YAML.load(path.join(baseDir, "src/docs/doc.yaml"));

const app = express();

app.use(
  cors({
    origin: "*", // In production, specify your domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome Rental booking app",
  });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", propertyRouter);
app.use("/api/v1", bookingRouter);



// app.all("*", (req, res, next) => {
//   next(
//     new AppError({
//       message: `Cannot find ${req.originalUrl} on this server`,
//       statusCode: 404,
//       isOperational: false,
//       type: "error",
//     })
//   );
// });

app.use(errorHandler as ErrorRequestHandler);


export default app;
