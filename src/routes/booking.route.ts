import express from "express";
import { BookingController } from "../controllers/booking.controller";

const bookingRouter = express.Router()

bookingRouter.post('/booking', BookingController.createBooking)
bookingRouter.delete("/bookings/:id", BookingController.cancelBooking);

export default bookingRouter