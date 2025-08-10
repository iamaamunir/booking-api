import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  user_name: string;

  @Column({ type: "date" })
  start_date: string;

  @Column({ type: "date" })
  end_date: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "uuid", name: "property_id" })
  property_id: string;

  @ManyToOne("Property", "bookings", { onDelete: "CASCADE" })
  @JoinColumn({ name: "property_id" })
  property?: any;
}
