import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface productInterface {
  name: string,
  age: number
}

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getUser(): string {
    return this.appService.getUser()
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string): productInterface[] {
    return [{
      name: "alan_" + id,
      age: 18
    }]
  }

  @Post()
  getProduct(): productInterface[] {
    return [{
      name: "alan nixon", age: 18
    }]
  }

  @Get('dynamic')
  getQueryAndShow(@Query('userName') userName: string, @Query('age') age: number): productInterface {
    return {
      age, name: userName
    }
  }



}
