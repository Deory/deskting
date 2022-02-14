import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({
  autoIndex: true,
})
export class User {
  @Prop({
    required: false,
    type: String,
    enum: ['admin', 'student'],
    default: 'student',
  })
  @ApiProperty({
    example: 'admin',
    description: '사용자 타입',
    enum: ['admin', 'student'],
    default: 'student',
    required: false,
  })
  type: USER_TYPE;

  @ApiProperty({
    example: 'kevin',
    description: '사용자 이름',
    required: true,
  })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({
    example: '123',
    description: '사용자 비밀번호',
    required: true,
  })
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty({
    description: 'admin: 관리중인 학교, student: 구독중인 학교',
    readOnly: true,
    required: false,
  })
  @Prop()
  schools: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);

// typescript의 enum 타입은 javascript 로 translate될 때, ...
// 정확하게 이해하지 못했지만, enum을 구현하기 위해 생성된 코드가 bundler에서 사용하지 못할때도 제외되지 못하는듯
// reference https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
export enum USER_TYPE {
  ADMIN,
  STUDENT,
}
// const _USER_TYPE = {
//   ADMIN: 'admin',
//   STUDENT: 'student',
// };
// export type USER_TYPE = typeof _USER_TYPE[keyof typeof _USER_TYPE];
// 왜 타입이 string으로 잡히지..? 이러면 validation이 힘들어 ㅠㅠ
