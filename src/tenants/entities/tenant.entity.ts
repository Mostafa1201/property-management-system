import { ModelEntity } from "../../common/modelEntity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ITenant } from "../interfaces/tenant.interface";
import { BaseTimeEntity } from "../../common/dateEntity";
import { Unit } from "../../units/entities/unit.entity";
@Entity()
@BaseTimeEntity()
export class Tenant extends ModelEntity implements ITenant{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    fullName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(type => Unit, unit => unit.tenant , { eager: true })
    @JoinColumn()
    units: Unit[];
}
