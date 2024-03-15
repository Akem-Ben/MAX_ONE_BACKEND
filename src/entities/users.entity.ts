import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Locations } from "../interfaces/locations.interface";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, type: "varchar" })
  first_name: string;

  @Column({ nullable: false, type: "varchar" })
  last_name: string;

  @Column({ nullable: false, type: "varchar" })
  email: string;

  @Column({ nullable: false, type: "varchar" })
  phone: string;

  @Column({ nullable: false, type: "varchar" })
  password: string;

  @Column({ nullable: false,  type: "enum", enum: Locations })
  location: string;

  @Column({ nullable: false, type: "varchar" })
  interest: string;

  @Column({ nullable: false, type: "varchar" })
  agent_code: string;

  @Column({ nullable: false, type: "varchar" })
  sub_channel: string;

  @Column({ nullable: false, type: "varchar" })
  channel: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
  
}
