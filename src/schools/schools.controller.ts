// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { MongoIdValidationPipe } from 'src/util/validation.pipe';
import { ObjectId } from 'mongoose';
// eslint-disable-next-line prettier/prettier
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { School } from './schema/school.schema';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @ApiOperation({
    summary: 'Create School',
    description: '학교 페이지를 생성한다.',
  })
  @ApiBody({ type: School })
  @ApiResponse({ status: 201, description: 'School Created', type: School })
  @ApiResponse({ status: 400, description: 'Wrong Body Format' })
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolsService.create(createSchoolDto);
  }

  @ApiOperation({
    summary: 'Retrieve all Schools',
    description: '학교 페이지를 모두 조회한다.',
  })
  @ApiResponse({ status: 200, description: 'Schools list', type: [School] })
  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve the School',
    description: '학교 페이지를 조회한다.',
  })
  @ApiParam({ name: 'school id', description: 'id of the school to retrieve' })
  @ApiResponse({ status: 200, description: 'School', type: School })
  @ApiResponse({ status: 400, description: 'Wrong School ID format' })
  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: ObjectId): Promise<School> {
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
