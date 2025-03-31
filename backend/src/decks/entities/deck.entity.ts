import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Like {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  id_user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true,
    index: true,
  })
  id_deck: string;
}

export type LikeDocument = HydratedDocument<Like>;
export const LikeSchema = SchemaFactory.createForClass(Like);

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

  @Prop({})
  description: string;

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

  @Prop({ default: 0 })
  likes: number;

  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  id_creator: string;

  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  id_user: string;
}

export type DeckDocument = HydratedDocument<Deck>;
export const DeckSchema = SchemaFactory.createForClass(Deck);
