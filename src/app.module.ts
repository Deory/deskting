import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/deskting'),
    SchoolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
