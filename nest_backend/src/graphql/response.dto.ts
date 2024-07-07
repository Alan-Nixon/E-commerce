import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Response {
    @Field(() => Boolean)
    status: boolean;

    @Field(() => String, { nullable: true })
    token: string;

    @Field(() => String, { nullable: true })
    message: string;
}
