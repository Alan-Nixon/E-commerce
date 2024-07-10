import { UserRepositary } from "src/repositary/user.repositarty";
import { responseType, userLogin, UserType } from "./user.dto";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { UserHelpers } from "./user.helpers";

@Injectable()
export class UserService {

    constructor(
        private readonly UserRepositary: UserRepositary,
        private readonly UserHelpers: UserHelpers
    ) { }

    async login(userLogin: userLogin): Promise<responseType> {

        try {
            const user: UserType = await this.UserRepositary.getUserByEmail(userLogin.Email + "")
            if (user) {
                if (await compare(userLogin.Password, user.Password)) {
                    console.log(await compare(userLogin.Password, user.Password))
                    const token = this.UserHelpers.generateToken(user)
                    console.log(token);
                    return { status: true, message: 'Login successfull', token, data: JSON.stringify(user) };
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

    async register(userRegister: UserType): Promise<responseType> {
        try {
            console.log(userRegister);
            return { status: true, message: "success" }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }

    async getUserDetails(Email: string): Promise<responseType> {
        try {
            const data = JSON.stringify(await this.UserRepositary.getUserByEmail(Email))
            console.log(data);
            return { status: true, message: "success", data }
        } catch (error: any) {
            console.log(error.message ?? "Internal Error occured");
            return { status: false, message: error.message }
        }
    }

    async forgetPassword(Email: string, newPassword: string): Promise<responseType> {
        try {
            const data = await this.UserRepositary.getUserByEmail(Email)
            if (data) {
                console.log(newPassword, data);

                if (await compare(newPassword, data.Password + "")) {
                    return { status: false, message: "new password cannot be same as old one!" }
                } else {
                    data.Password = await hash(newPassword + "", 10)
                    await this.UserRepositary.updateFeild(Email, data)
                    return { status: true, message: "success" }
                }
            } else {
                return { status: false, message: "Email not found" }
            }
        } catch (error: any) {
            console.log(error ?? "Internal Error occured");
            return { status: false, message: error.message }
        }
    }
}
