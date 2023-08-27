import { ModelEntity } from "../../common/modelEntity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IProperty } from "../interfaces/property.interface";
import { BaseTimeEntity } from "../../common/dateEntity";
import { Unit } from "../../units/entities/unit.entity";

@Entity()
@BaseTimeEntity()
export class Property extends ModelEntity implements IProperty{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    propertyName: string;

    @Column()
    location: string;

    @OneToMany(type => Unit, unit => unit.property , { eager: true })
    @JoinColumn()
    units: Unit[];
}