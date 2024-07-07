import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Response } from './response.dto';

@Resolver()
export class AppResolver {
    @Query(() => String)
    hello(): string {
        return 'Hello World';
    }

    @Mutation(() => Response)
    async login(
        @Args('Email') email: string,
        @Args('Password') password: string,
    ): Promise<Response> {
        return { status: true, token: 'generated-token', message: 'Login successful' };
    }
}
