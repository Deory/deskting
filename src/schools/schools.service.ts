import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateSchoolDto } from './dto/create-school.dto';
import { School, SchoolDocument } from './schema/school.schema';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async findAll(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<School> {
    return this.schoolModel.findById(id).exec();
  }

  // update(id: ObjectId, updateSchoolDto: UpdateSchoolDto) {
  //   return `This action updates a #${id} school`;
  // }

  // remove(id: ObjectId) {
  //   return `This action removes a #${id} school`;
  // }
}
