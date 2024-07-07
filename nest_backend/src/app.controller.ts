import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface productInterface {
  name: string,
  age: number
}

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }
}
