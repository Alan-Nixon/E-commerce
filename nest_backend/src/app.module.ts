import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [GraphqlModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
