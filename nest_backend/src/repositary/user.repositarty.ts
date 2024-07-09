import { Injectable } from "@nestjs/common";
import { client } from "src/config/database";
import { UserType } from "src/user/user.dto";

@Injectable()
export class UserRepositary {

    constructor() { client.connect() }

    async getUserByEmail(Email: string) {
        return JSON.parse(await client.get(Email))
    }

    async updateFeild(Email: string, data: UserType) {
        return await client.set(Email, JSON.stringify(data))
    }

}