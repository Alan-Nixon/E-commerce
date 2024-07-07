// src/graphql/response.dto.ts

import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Response { 
    @Field(() => Boolean)
    status: boolean;

    @Field(() => String, { nullable: true })
    token: string;

    @Field(() => String, { nullable: true })
    message: string;
}
 
@InputType() 
export class LoginData {
    @Field(() => String)
    Email: string;

    @Field(() => String)
    Password: string;
}
