import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ResponseInterface {
    status: boolean;
    message: string;
    data?: any;
    token?:string

    constructor(status: boolean, message: string, data?: any, token?: string) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.token = token
    }
}


export class UserRegister {

    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsString()
    @IsNotEmpty()
    FullName: string;

    @IsString()
    @IsOptional()
    ProfileImage: string;

    @IsString()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty()
    Password: string;

    @IsNumber()
    @IsNotEmpty()
    Phone: number

    @IsBoolean()
    @IsNotEmpty()
    IsAdmin: boolean;

    @IsBoolean()
    @IsNotEmpty()
    IsBlocked: boolean;
}