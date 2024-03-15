import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { Repository } from "typeorm";

@Entity({ name: "super_admin" })
export class SuperAdmin {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "varchar" })
  first_name!: string;

  @Column({ nullable: false, type: "varchar" })
  last_name!: string;

  @Column({ nullable: false, type: "varchar" })
  email!: string;

  @Column({ nullable: false, type: "varchar" })
  phone!: string;

  @Column({ nullable: false, type: "varchar" })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

// const superAdminRepository = Repository<SuperAdmin>

// export { superAdminRepository };