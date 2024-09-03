import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(1, 25)
    firstName: string

    @IsString()
    @Length(1, 25)
    lastName: string

    @IsEmail()
    @Length(1, 100)
    email: string

    @IsString()
    @Length(1, 14)
    phone: string
}
