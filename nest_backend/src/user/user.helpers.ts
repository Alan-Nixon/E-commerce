import { Payload, UserType } from "./user.dto";
import { sign, verify } from 'jsonwebtoken'

export class UserHelpers {
    generateToken(user: UserType) {
        return sign(user, process.env.JWT_SECRET, { expiresIn: '2d' });
    }

    adminTokenVerify(token: string): boolean {
        try {
            const payload: Payload | string = verify(token, process.env.JWT_SECRET) as Payload
            if (typeof payload === "string") { return false }
            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < currentTime) { return false; }
            if (!payload.IsAdmin) { return false; }
            return true;
        } catch (error) {
            return false;
        }
    }
}

