import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  type: USER_TYPE;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  password: string;
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
