import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepositary } from 'src/repositary/user.repositarty';

@Module({
    providers: [UserResolver, UserService, UserRepositary]
})
export class UserModule { }
