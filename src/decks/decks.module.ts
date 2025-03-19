import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckSchema, LikeSchema } from './entities/deck.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }]),
  ],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
