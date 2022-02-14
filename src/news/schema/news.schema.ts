import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NewsDocument = News & Document;

@Schema({
  timestamps: true,
})
export class News {
  @Prop({ required: true })
  @ApiProperty({
    description: '학교 ID',
    readOnly: true,
  })
  school: string;

  @Prop({ required: false })
  @ApiProperty({
    description: '작성자 ID',
    readOnly: true,
  })
  author: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '3월 2일 개학 안내.',
    description: '소식 내용',
    required: true,
  })
  content: string;

  @ApiProperty({
    description: '소식 생성 일짜',
    readOnly: true,
  })
  createdAt: Date;

  @ApiProperty({
    description: '소식 갱신 일짜',
    readOnly: true,
  })
  updatedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
