import { Injectable } from '@nestjs/common';
import { client } from './config/database';

@Injectable()
export class AppService {

  getHello(): string {    
    return 'Hello World!';
  } 

  getUser() {
    client.select(1)
    console.log(client);
    return "this is the user : alan nixon paliakkara"
  }
   
}
