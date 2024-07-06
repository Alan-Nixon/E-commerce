import { Injectable } from "@nestjs/common";
import { client } from "src/config/database";
import { UserRegister } from "./dto/users.dto";

@Injectable()
export class UserRepositary {
    constructor() { client.connect(); }

    async findUserByEmail(Email: string) {
        return await client.get(Email)
    }

    async insertUser(UserRegister: UserRegister) {
        return await client.set(UserRegister.Email, JSON.stringify(UserRegister))
    }
}