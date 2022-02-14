import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SchoolsService } from 'src/schools/schools.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News, NewsDocument } from './schema/news.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    private schoolsService: SchoolsService,
  ) {}

  async create(
    schoolId: ObjectId,
    createNewsDto: CreateNewsDto,
  ): Promise<News> {
    await this.schoolsService.findOne(schoolId);
    const createdNews = new this.newsModel(createNewsDto)
      .set('school', schoolId)
      .set('user', 'Deory');
    return createdNews.save();
  }

  async findOne(schoolId: ObjectId, id: ObjectId): Promise<News> {
    const news = await this.newsModel
      .findOne({ school: schoolId, _id: id })
      .exec();
    if (!news) {
      throw new NotFoundException('News Not Found');
    }
    return news;
  }

  async update(
    schoolId: ObjectId,
    id: ObjectId,
    updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    const updatedNews = await this.newsModel
      .findOneAndUpdate({ school: schoolId, _id: id }, updateNewsDto, {
        new: true,
      })
      .exec();
    if (!updatedNews) {
      throw new NotFoundException('News Not Found');
    }
    return updatedNews;
  }

  async remove(schoolId: ObjectId, id: ObjectId): Promise<News> {
    const deletedPost = await this.newsModel
      .findOneAndDelete({ school: schoolId, _id: id })
      .exec();
    if (!deletedPost) {
      throw new NotFoundException('News Not Found');
    }
    return deletedPost;
  }
}
