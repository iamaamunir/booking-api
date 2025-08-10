import "reflect-metadata"
import express, { ErrorRequestHandler } from "express";
import propertyRouter from "./routes/property.route";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/appError";
import bookingRouter from "./routes/booking.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome Rental booking app",
  });
});

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
