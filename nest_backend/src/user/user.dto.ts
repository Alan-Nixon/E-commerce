import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType()
export class userLogin {
    @Field()
    Email: string;

    @Field()
    Password: string;
}


@InputType()
export class UserRegister {
    @Field()
    Email: string;

    @Field()
    Name: string;

    @Field()
    FullName: string;

    @Field()
    Phone: number;

    @Field()
    IsAdmin: boolean;
    @Field()
    IsBlocked: boolean;

    @Field()
    Password: string
}

@ObjectType()
export class responseType {
    @Field(() => Boolean)
    status: boolean;

    @Field(() => String)
    message: string = "";

    @Field({ nullable: true })
    token?: string;

    @Field(() => String || Number || Boolean || Array || Object, { nullable: true })
    data?: any;
}



export type UserType = {
    Name: string,
    FullName: string,
    Email: string,
    Password: string
    Phone: number,
    IsAdmin: boolean,
    IsBlocked: boolean,
}