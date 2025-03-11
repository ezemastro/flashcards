import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckSchema } from './entities/deck.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }])],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
