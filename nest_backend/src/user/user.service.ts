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
                    const token = this.UserHelpers.generateToken(user)
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
            const { data } = await this.getUserDetails(userRegister.Email);
            if (data !== "null") {
                return { status: false, message: "User already exist" }
            } else {
                await this.UserRepositary.createUser(userRegister)
                return { status: true, message: "success", data, token: this.UserHelpers.generateToken(userRegister) }
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }

    async getUserDetails(Email: string): Promise<responseType> {
        try {
            const data = JSON.stringify(await this.UserRepositary.getUserByEmail(Email))
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

    async adminLogin(Email: string, Password: string) {
        try {
            const data = await this.UserRepositary.getUserByEmail(Email)
            if (data) {
                if (data.IsAdmin) {
                    if (await compare(Password, data.Password)) {
                        const token = this.UserHelpers.generateToken(data)
                        return { status: true, message: 'Login successfull', token, data: JSON.stringify(data) };
                    } else {
                        return { status: false, message: "Password does not match" }
                    }
                } else {
                    return { status: false, message: "Admin not registered" }
                }
            } else {
                return { status: false, message: "Admin not registered" }
            }
        } catch (error) {
            console.log(error ?? "Internal Error occured");
            return { status: false, message: error.message }
        }
    }
}
