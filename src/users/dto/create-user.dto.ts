import { USER_TYPE } from '../schema/user.schema';

export class CreateUserDto {
  readonly type: USER_TYPE;
  readonly name: string;
  readonly password: string;
}
