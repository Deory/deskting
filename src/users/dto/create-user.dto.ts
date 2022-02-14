import { USER_TYPE } from '../schema/user.schema';
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEnum(USER_TYPE, { message: "type must in ['admin', 'student']" })
  readonly type?: USER_TYPE = USER_TYPE.STUDENT;
  readonly name: string;
  readonly password: string;
}
