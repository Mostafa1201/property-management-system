import { Unit } from "../../units/entities/unit.entity";

export interface IProperty {
  propertyName: string;
  location: string;
  units: Unit[] | [];
}
