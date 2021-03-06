import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { MongoExceptionFilter } from './util/mongoeException.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/deskting'),
    SchoolsModule,
    UsersModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
  ],
})
export class AppModule {}
