import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Valid rule required' })
    role: "INTERN" | "ENGINEER" | "ADMIN";

    age: number;
}