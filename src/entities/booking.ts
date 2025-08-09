import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "varchar" })
  title!: string;

  @Column({ nullable: false, type: "varchar" })
  lastname!: string;

  @Column({ nullable: false, type: "varchar" })
  email!: string;

  @Column({ nullable: false, type: "varchar" })
  password!: string;
}