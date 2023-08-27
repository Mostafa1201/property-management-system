import { IsNotEmpty } from "@nestjs/class-validator";
import { IsNumber } from "class-validator";
import { UnitStatus } from "../interfaces/unit.interface";

export class CreateUnitDto {

    @IsNumber()
    @IsNotEmpty({ message: 'propertyId is required' })
    readonly propertyId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'numOfRooms is required' })
    readonly numOfRooms: number;
    
    @IsNumber()
    @IsNotEmpty({ message: 'pricePerSquareMeter is required' })
    readonly pricePerSquareMeter: number;

    readonly status: UnitStatus
}
