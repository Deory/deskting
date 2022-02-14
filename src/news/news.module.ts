import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schema/news.schema';
import { SchoolsModule } from 'src/schools/schools.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    SchoolsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
