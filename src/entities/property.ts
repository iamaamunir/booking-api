import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { Booking } from "./booking.ts";

@Entity()
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "varchar" })
  title!: string;

  @Column({ nullable: false, type: "varchar" })
  description?: string;

  @Column({ nullable: false, type: "int" })
  price_per_night!: number;

  @Column({ nullable: false, type: "date" })
  available_from!: string;

  @Column({ nullable: false, type: "date" })
  available_to!: string;

  @OneToMany("Booking", "property", {
    onDelete: "CASCADE",
  })
  bookings?: Relation<Booking[]>;
}
