import { IsString, IsNotEmpty, IsDateString, IsUUID } from "class-validator";

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  property_id: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
