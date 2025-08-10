import "reflect-metadata";
import { IGetPropertiesDTO } from "../types/property.type";
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/property";
import { AppError } from "../utils/appError";
type DateRange = { start: string; end: string };
import { Booking } from "../entities/booking";

export class PropertyService {
  static async getAllProperty(
    page = 1,
    limit = 10
  ){
    const propertyRepo = AppDataSource.getRepository(Property);
    try {
      const [data, total] = await propertyRepo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return { data, total, page, limit };
    }
    catch (error:any) {
      throw new AppError({
        message: error.message || "Failed to fetch properties",
        statusCode: 500,
        isOperational: false,
        type: "error",
      });
    }
  }

  static async getAvailableDateRanges(
    propertyId: string
  ): Promise<{ property_id: string; available_ranges: DateRange[] }> {
    const propertyRepo = AppDataSource.getRepository(Property);
    const bookingRepo = AppDataSource.getRepository(Booking);

    const property = await propertyRepo.findOne({
      where: { id: propertyId },
      relations: ["bookings"],
    });
    if (!property || !property.bookings)
      throw new AppError({ message: "Property not found", statusCode: 404 });

    // Sort bookings by start_date ascending
    const bookings = property.bookings.sort((a, b) =>
      a.start_date.localeCompare(b.start_date)
    );

    const availableRanges: DateRange[] = [];
    let cursor = property.available_from;

    for (const booking of bookings) {
      if (cursor < booking.start_date) {
        // Add gap before booking
        availableRanges.push({ start: cursor, end: booking.start_date });
      }
      // Move cursor forward if booking.end_date is later
      if (booking.end_date > cursor) {
        cursor = booking.end_date;
      }
    }

    // Add the last range after the last booking if any
    if (cursor < property.available_to) {
      availableRanges.push({ start: cursor, end: property.available_to });
    }

    return {
      property_id: propertyId,
      available_ranges: availableRanges,
    };
  }
}
