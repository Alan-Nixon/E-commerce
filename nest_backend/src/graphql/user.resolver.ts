// src/graphql/user.resolver.ts

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LoginData, Response } from './response.dto';

@Resolver()
export class AppResolver {

    @Query(() => String)
    placeholder(): string { return 'Placeholder Query' }

    @Mutation(() => Response)
    async login(@Args('loginData') loginData: LoginData): Promise<Response> {
        console.log(loginData);
        
        return { status: true, token: 'generated-token', message: 'Login successful' };
    }
} 
