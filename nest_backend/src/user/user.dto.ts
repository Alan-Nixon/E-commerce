import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class userLogin {
    @Field()
    Email: string;

    @Field()
    Password: string;
}

@ObjectType()
export class responseType {
    @Field(() => Boolean)
    status: boolean;

    @Field()
    message: string = "";

    @Field({ nullable: true })
    token?: string;

    @Field(() => [String], { nullable: true })
    data?: string[];
}
