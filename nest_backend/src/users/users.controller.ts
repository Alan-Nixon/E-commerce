import { Body, Controller, Post } from '@nestjs/common';
import { ResponseInterface, UserRegister } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UsersService) { }

    @Post()
    async postLogin(@Body('Email') Email: string, @Body('Password') Password: string): Promise<ResponseInterface> {
        return await this.UserService.postLogin(Email)
    }

    @Post('register')
    async postRegister(@Body() UserRegister:UserRegister) {
        return await this.UserService.PostRegister(UserRegister)
    }
}
