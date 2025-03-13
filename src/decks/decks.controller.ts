import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { AddCartsDto } from './dto/add-cards.dto';
import { DeleteCardsDto } from './dto/delete-cards.dto';
import { SearchCardsDto } from './dto/search_cards';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}
  //Se crea un nuevo deck
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

  //Se eliminan cartas del deck permanentemente
  //Se solicita el id del deck, id del usuario y un arreglo de las cartas a eliminar
  @Delete('/cards')
  deleteCards(@Body() deleteCardsDto: DeleteCardsDto) {
    return this.decksService.DeleteCards(deleteCardsDto);
  }

  //Se obtienen todos los decks de un usuario
  //Se solicita el id del usuario
  @Get('/:id')
  listDecksByUser(@Param('id') id: string) {
    return this.decksService.listDecksByUser(id);
  }

  //Se obtienen todas las cartas de un deck
  //Se solicita el id del deck y el id del usuario
  @Get('/user/cards')
  listCardsByDeckByUser(@Query() deleteDeckDto: UpdateDeckDto) {
    return this.decksService.listCardsByDeckByUser(deleteDeckDto);
  }

  //Se obtienen todos los decks publicos
  @Get('/public/decks')
  searchDecksPublicks(@Query() searchCardsDto: SearchCardsDto) {
    console.log(searchCardsDto);
    return this.decksService.searchDecksPublics(searchCardsDto);
  }
}
