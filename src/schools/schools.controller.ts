// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { MongoIdValidationPipe } from 'src/validation.pipe';
import { ObjectId } from 'mongoose';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: ObjectId) {
    return this.schoolsService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id', MongoIdValidationPipe) id: ObjectId,
  //   @Body() updateSchoolDto: UpdateSchoolDto,
  // ) {
  //   return this.schoolsService.update(id, updateSchoolDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', MongoIdValidationPipe) id: ObjectId) {
  //   return this.schoolsService.remove(id);
  // }
}
