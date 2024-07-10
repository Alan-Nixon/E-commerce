import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepositary } from 'src/repositary/user.repositarty';
import { UserHelpers } from './user.helpers';

@Module({ providers: [UserResolver, UserService, UserRepositary, UserHelpers] })
export class UserModule { }
