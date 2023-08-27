import { IsNotEmpty, Length } from "@nestjs/class-validator";

export class CreatePropertyDto {
    @Length(2, 30, { message: 'propertyName must be at least 2 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'propertyName is required' })
    readonly propertyName: string;

    @IsNotEmpty({ message: 'location is required' })
    readonly location: string;
}
