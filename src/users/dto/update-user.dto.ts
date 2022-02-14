import { PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  schools: [ObjectId];
}
