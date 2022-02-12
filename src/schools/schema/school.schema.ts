import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolDocument = School & Document;

@Schema()
export class School {
  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  name: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
