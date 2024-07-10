import { UserType } from "./user.dto";
import { sign } from 'jsonwebtoken'

export class UserHelpers {
    generateToken(user: UserType) {
        return sign(user, process.env.JWT_SECRET, { expiresIn: '2d' });
    }
}

