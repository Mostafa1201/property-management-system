import { Unit } from "../../units/entities/unit.entity";

export interface ITenant {
  fullName: null | string;
  email: string;
  phone: string;
  units: Unit[] | [];
}
