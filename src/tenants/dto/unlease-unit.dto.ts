import { IsNotEmpty, IsNumber } from "class-validator";

export class UnleaseUnitDto {
    @IsNumber()
    @IsNotEmpty({ message: 'unitId is required' })
    readonly unitId: number;
}
