import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { AddCartsDto } from './dto/add-cards.dto';
import { DeleteCardsDto } from './dto/delete-cards.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post('newdeck')
  createDeck(@Body() createDeckDto: CreateDeckDto) {
    console.log(createDeckDto);
    return this.decksService.createDeck(createDeckDto);
  }

  //Este metodo sirve para 2 opcciones
  //1. Actualizar el deck a publico o privado
  //2. Actualizar el nombre del deck
  @Patch()
  updateNameOrPublicDeck(@Body() updateDeckDto: UpdateDeckDto) {
    return this.decksService.updateNameOrPublicDeck(updateDeckDto);
  }

  //Se elimina por completo el deck por completo de la db
  //Se solicita el id del deck y el id del usuario
  @Delete()
  deleteDeck(@Body() deleteDeckDto: UpdateDeckDto) {
    return this.decksService.deleteDeck(deleteDeckDto);
  }

  //Se agrega una cartas al deck
  //Se solicita el id del deck, id del usuario y un arreglo de las nuevas cartas
  @Patch('/addcards')
  addCartsToDeck(@Body() addCartsDto: AddCartsDto) {
    return this.decksService.addCartsToDeck(addCartsDto);
  }

  // @Patch()
  // updateCard(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
  //   return this.decksService.update(+id, updateDeckDto);
  // }

  @Delete('/cards')
  deleteCards(@Body() deleteCardsDto: DeleteCardsDto) {
    return this.decksService.DeleteCards(deleteCardsDto);
  }

  @Get('/:id')
  listDecksByUser(@Param('id') id: string) {
    return this.decksService.listDecksByUser(id);
  }

  // @Get()
  // listDecksPublics() {
  //   return this.decksService.listDecksPublics();
  // }
}
