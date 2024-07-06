import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositary } from './users.repositary';

@Module({
  imports:[],
  providers: [UsersService,UserRepositary],
  controllers: [UsersController]
})
export class UsersModule {}
