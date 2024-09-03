import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'The user\'s first name' })
    @IsString()
    @Length(1, 25)
    firstName: string

    @ApiProperty({ description: 'The user\'s last name' })
    @IsString()
    @Length(1, 25)
    lastName: string

    @ApiProperty({ description: 'The user\'s position' })
    @IsString()
    @Length(1, 25)
    position: string

    @ApiProperty({ description: 'The user\'s email address' })
    @IsEmail()
    @Length(1, 100)
    email: string

    @ApiProperty({ description: 'The user\'s phone number' })
    @IsString()
    @Length(1, 14)
    phone: string
}
