import { IsEmail, IsMobilePhone, IsNotEmpty, Length } from "@nestjs/class-validator";

export class CreateTenantDto {
    
    @Length(2, 30, { message: 'fullName must be at least 2 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'fullName is required' })
    readonly fullName: string;

    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'email is required' })
    readonly email: string;
    
    @IsMobilePhone()
    @IsNotEmpty({ message: 'phone is required' })
    readonly phone: string;
}
