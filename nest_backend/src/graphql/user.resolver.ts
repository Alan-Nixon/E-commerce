import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ResponseInterface } from 'src/users/dto/users.dto';

@Resolver()
export class AppResolver {
    @Mutation(() => ResponseInterface)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<ResponseInterface> {

        return { status: true, token: 'generated-token', message: 'Login successful' };
    }
}
