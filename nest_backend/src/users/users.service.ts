import { Injectable } from '@nestjs/common';
import { ResponseInterface, UserRegister } from './dto/users.dto';
import { UserRepositary } from './users.repositary';
import { hash, compare } from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(private readonly UserRepositary: UserRepositary) { }

    async postLogin(Email: string): Promise<ResponseInterface> {
        const user = await this.UserRepositary.findUserByEmail(Email)
        if (user) {
            return { status: true, message: "success", data: JSON.parse(user) }
        } else {
            return { status: false, message: "user not found", data: null }
        }
    }

    async PostRegister(UserRegister: UserRegister): Promise<ResponseInterface> {
        const user = await this.UserRepositary.findUserByEmail(UserRegister.Email)
        if (user) {
            return { status: false, message: "Email already exists" }
        } else {
            UserRegister.Password = await hash(UserRegister.Password, 10);
            UserRegister.Phone = Number(UserRegister.Phone)
            UserRegister.IsAdmin = Boolean(UserRegister.IsAdmin)
            UserRegister.IsBlocked = Boolean(UserRegister.IsBlocked)
            return { status: false, message: "Success", data: await this.UserRepositary.insertUser(UserRegister) }
        }
    }
}
