import { Injectable } from "@nestjs/common";
import { client } from "src/config/database";

@Injectable()
export class UserRepositary {

    constructor() { client.connect() }

    async getUserByEmail(Email: string) {
        return JSON.parse(await client.get(Email))
    }

}