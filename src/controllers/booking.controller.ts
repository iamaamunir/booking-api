// controllers/booking.controller.ts
import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { BookingService } from "../services/booking.service";
import { CreateBookingDto } from "../dto/create-booking.dto";
import { CreateBookingResponse } from "../types/booking.type";

export class BookingController {
  static async createBooking(req: Request, res: Response): Promise<void> {
    try {
      // Transform and validate request body
      const createBookingDto = plainToClass(CreateBookingDto, req.body);
      const errors = await validate(createBookingDto);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values(error.constraints || {}).join(", "))
          .join("; ");

        res.status(400).json({
          error: "Validation failed",
          details: errorMessages,
        });
        return;
      }

      // Create booking
      const booking = await BookingService.createBooking(createBookingDto);

      // Prepare response
      const response: CreateBookingResponse = {
        id: booking.id,
        user_name: booking.user_name,
        start_date: booking.start_date,
        end_date: booking.end_date,
        created_at: booking.created_at,
        property_id: createBookingDto.property_id,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating booking:", error);

      if (error instanceof Error) {
        // Handle known business logic errors
        if (
          error.message.includes("not found") ||
          error.message.includes("Invalid date") ||
          error.message.includes("Start date must be") ||
          error.message.includes("within property availability") ||
          error.message.includes("overlap with existing")
        ) {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      // Handle unexpected errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
