import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { Booking } from "../entities/booking";
import { Property } from "../entities/property";
import { CreateBookingDto } from "../dto/create-booking.dto";

export class BookingService {
  static async createBooking(
    createBookingDto: CreateBookingDto
  ): Promise<Booking> {
    const { property_id, user_name, start_date, end_date } = createBookingDto;
    const bookingRepository = AppDataSource.getRepository(Booking);
    const propertyRepository = AppDataSource.getRepository(Property);

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    if (startDate >= endDate) {
      throw new Error("Start date must be before end date");
    }

    // Check if property exists and get its availability
    const property = await propertyRepository.findOne({
      where: { id: property_id },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    // Validate dates are within property availability range
    const availableFrom = new Date(property.available_from);
    const availableTo = new Date(property.available_to);

    if (startDate < availableFrom || endDate > availableTo) {
      throw new Error(
        `Booking dates must be within property availability range (${property.available_from} to ${property.available_to})`
      );
    }

    // Check for overlapping bookings
    const overlappingBookings = await bookingRepository
      .createQueryBuilder("booking")
      .where("booking.property.id = :propertyId", { propertyId: property_id })
      .andWhere(
        "(booking.start_date <= :endDate AND booking.end_date >= :startDate)",
        { startDate: start_date, endDate: end_date }
      )
      .getCount();

    if (overlappingBookings > 0) {
      throw new Error("Selected dates overlap with existing bookings");
    }

    const booking = new Booking();
    booking.user_name = user_name;
    booking.start_date = start_date;
    booking.end_date = end_date;
    booking.property = property;

    // Save the booking
    const savedBooking = await bookingRepository.save(booking);

    // Optional: Refresh property to ensure relationship is loaded
    await propertyRepository
      .createQueryBuilder()
      .relation(Property, "bookings")
      .of(property_id)
      .add(savedBooking.id);

    return savedBooking;
  }
}
