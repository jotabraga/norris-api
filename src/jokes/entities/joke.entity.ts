import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Joke extends Document {
  @Prop()
  queryType: string;

  @Prop()
  result: string;

  @Prop()
  searchTerm: string;

  @Prop()
  timestamp: string;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
