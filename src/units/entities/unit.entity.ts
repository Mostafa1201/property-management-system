import { ModelEntity } from "../../common/modelEntity";
import { IUnit, UnitStatus } from "../interfaces/unit.interface";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "../../common/dateEntity";
import { Property } from "../../properties/entities/property.entity";
import { Tenant } from "../../tenants/entities/tenant.entity";

@Entity()
@BaseTimeEntity()
export class Unit extends ModelEntity implements IUnit{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Tenant, tenant => tenant.units)
    tenant: Tenant;

    @Column({ nullable: true })
    tenantId: number;

    @ManyToOne(type => Property, property => property.units)
    property: Property;

    @Column()
    propertyId: number

    @Column()
    numOfRooms: number;

    @Column()
    pricePerSquareMeter: number;
 
    @Column({ type: "enum", enum: UnitStatus, default: UnitStatus.vacant })
    status: UnitStatus;
}
