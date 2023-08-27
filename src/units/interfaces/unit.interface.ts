import { Property } from "../../properties/entities/property.entity";
import { Tenant } from "../../tenants/entities/tenant.entity";

export interface IUnit {
  tenant: Tenant | null;
  property: Property | null;
  tenantId: number;
  propertyId: number;
  numOfRooms: number;
  pricePerSquareMeter: number;
  status: UnitStatus
}

export enum UnitStatus {
  vacant = "vacant",
  occupied = "occupied"
}