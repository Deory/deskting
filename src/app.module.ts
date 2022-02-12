import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsController } from './schools/schools.controller';
import { SchoolsService } from './schools/schools.service';
import { SchoolsModule } from './schools/schools.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/deskting'),
    SchoolsModule,
  ],
  controllers: [AppController, SchoolsController],
  providers: [AppService, SchoolsService],
})
export class AppModule {}
