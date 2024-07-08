import { UserRepositary } from "src/repositary/user.repositarty";
import { responseType, userLogin, UserType } from "./user.dto";
import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";

@Injectable()
export class UserService {

    constructor(private readonly UserRepositary: UserRepositary) { }

    async login(userLogin: userLogin): Promise<responseType> {

        try {
            const user: UserType = await this.UserRepositary.getUserByEmail(userLogin.Email + "")
            if (user) {
                if (await compare(userLogin.Password, user.Password)) {
                    return { status: true, message: 'Login successfull', token: "token ind", data: JSON.stringify(user) };
                } else {
                    return { status: false, message: "Incorrect Password" }
                }
            } else {
                return { status: false, message: 'Invalid credentials', data: null };
            }
        } catch (error: any) {
            return { status: false, message: error.message ?? "Internal Error" }
        }
    }

    async register(userRegister:UserType): Promise<responseType> {
        try {
            console.log(userRegister);
            return { status: true, message: "success", }
        } catch (error: any) {
            return { status: false, message: error.message, }
        }
    }


}