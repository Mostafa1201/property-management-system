import { IsNotEmpty, IsNumber } from "class-validator";

export class LeaseUnitDto {
    @IsNumber()
    @IsNotEmpty({ message: 'tenantId is required' })
    readonly tenantId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'unitId is required' })
    readonly unitId: number;
}
