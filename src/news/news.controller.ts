// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ObjectId } from 'mongoose';
// eslint-disable-next-line prettier/prettier
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { News } from './schema/news.schema';
import { MongoIdValidationPipe } from 'src/util/validation.pipe';

@ApiTags('news')
@ApiResponse({ status: 400, description: 'Wrong ID format' })
@ApiResponse({ status: 404, description: 'Can Not Found Resource' })
@Controller('schools')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({
    summary: 'Create News',
    description: '학교 페이지에 뉴스를 생성한다.',
  })
  @ApiBody({ type: News })
  @ApiResponse({ status: 201, description: 'News Created', type: News })
  @ApiResponse({ status: 400, description: 'Wrong Format' })
  @Post(':schoolId/news')
  async create(
    @Param('schoolId', MongoIdValidationPipe) schoolId: ObjectId,
    @Body() createNewsDto: CreateNewsDto,
  ): Promise<News> {
    return this.newsService.create(schoolId, createNewsDto);
  }

  @ApiOperation({
    summary: 'Retrieve the News',
    description: '학교 페이지를 조회한다.',
  })
  @ApiParam({ name: 'school id', description: 'id of the school' })
  @ApiParam({ name: 'id', description: 'id of the News to retrieve' })
  @ApiResponse({ status: 200, description: 'News', type: News })
  @Get(':schoolId/news/:id')
  async findOne(
    @Param('schoolId', MongoIdValidationPipe) schoolId: ObjectId,
    @Param('id', MongoIdValidationPipe) id: ObjectId,
  ): Promise<News> {
    return this.newsService.findOne(schoolId, id);
  }

  @ApiOperation({
    summary: 'Update the News',
    description: '학교 페이지를 수정한다.',
  })
  @ApiBody({ type: News })
  @ApiParam({ name: 'school id', description: 'id of the school' })
  @ApiParam({ name: 'id', description: 'id of the News to retrieve' })
  @ApiResponse({ status: 200, description: 'News', type: News })
  @Put(':schoolId/news/:id')
  async update(
    @Param('schoolId', MongoIdValidationPipe) schoolId: ObjectId,
    @Param('id', MongoIdValidationPipe) id: ObjectId,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.update(schoolId, id, updateNewsDto);
  }

  @ApiOperation({
    summary: 'Delete the News',
    description: '학교 페이지를 삭제한다.',
  })
  @ApiParam({ name: 'school id', description: 'id of the school' })
  @ApiParam({ name: 'id', description: 'id of the News to retrieve' })
  @ApiResponse({ status: 200, description: 'News', type: News })
  @Delete(':schoolId/news/:id')
  async remove(
    @Param('schoolId', MongoIdValidationPipe) schoolId: ObjectId,
    @Param('id, MongoIdValidationPipe') id: ObjectId,
  ): Promise<News> {
    return this.newsService.remove(schoolId, id);
  }
}
