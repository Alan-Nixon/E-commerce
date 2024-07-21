import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { userLogin, responseType, UserRegister } from "./user.dto";
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
        console.log(userRegister);
        
        return await this.UserService.register(userRegister) 
    }
 
    @Mutation(() => responseType)
    async getUserDetails(@Args('Email') Email: string): Promise<responseType> {
        return await this.UserService.getUserDetails(Email)
    }

    @Mutation(() => responseType) 
    async forgetPassword(@Args('Email') Email: string, @Args('newPassword') newPassword: string) {
        return await this.UserService.forgetPassword(Email, newPassword)
    }

}
