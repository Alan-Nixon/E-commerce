import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { userLogin, responseType, UserType, UserRegister } from "./user.dto";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {

    constructor(private readonly UserService: UserService) { }

    @Query(() => String)
    placeHolder(): string {
        return 'This is a placeholder query';
    }

    @Mutation(() => responseType)
    async login(@Args('userLogin') userLogin: userLogin): Promise<responseType> {
        return await this.UserService.login(userLogin)
    }

    @Mutation(() => responseType)
    async register(@Args('userRegister') userRegister: UserRegister): Promise<responseType> {
        return await this.UserService.register(userRegister)
    }

}
