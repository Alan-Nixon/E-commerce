import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { userLogin, responseType } from "./user.dto";

@Resolver()
export class UserResolver {

    @Query(() => String)
    placeHolder(): string {
        return 'This is a placeholder query';
    }

    @Mutation(() => responseType)
    async login(@Args('userLogin') userLogin: userLogin): Promise<responseType> {
        const authenticated = true;
        console.log(userLogin);
        
        if (authenticated) {
            return { status: true, message: 'Login successfull',token:"token ind" };
        } else {
            return { status: false, message: 'Invalid credentials' };
        }
    } 
}
