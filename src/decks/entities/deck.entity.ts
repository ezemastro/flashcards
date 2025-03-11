import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Card {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({
    required: true,
    maxlength: 180,
  })
  question: string;

  @Prop({
    required: true,
    maxlength: 180,
  })
  answer: string;

  @Prop({ String })
  category: string;
}

export type CardDocument = HydratedDocument<Card>;
export const CardSchema = SchemaFactory.createForClass(Card);

@Schema({ timestamps: true })
export class Deck {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  name: string;

  @Prop({
    type: [CardSchema],
  })
  cards: Card[];

  @Prop({
    default: false,
  })
  public: boolean;

  @Prop({ type: [String] })
  categories: string[];

  @Prop()
  likes: number;

  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  id_user: string;
}

export type DeckDocument = HydratedDocument<Deck>;
export const DeckSchema = SchemaFactory.createForClass(Deck);
