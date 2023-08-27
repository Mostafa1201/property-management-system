import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsMobilePhone, IsNotEmpty, Length } from "@nestjs/class-validator";
@Entity()
export class Tenant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 30, { message: 'fullName must be at least 2 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'fullName is required' })
    fullName: string;

    @Column()
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @Column()
    @IsMobilePhone()
    @IsNotEmpty({ message: 'phone is required' })
    phone: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}
