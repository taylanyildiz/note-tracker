import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(2)
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @MinLength(2)
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}