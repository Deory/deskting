import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SchoolDocument = School & Document;

@Schema()
export class School {
  @Prop({ required: true })
  @ApiProperty({
    example: 'Seoul',
    description: '학교 지역',
    required: true,
  })
  region: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'Ogeum Hish School',
    description: '학교 이름',
    required: true,
  })
  name: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
