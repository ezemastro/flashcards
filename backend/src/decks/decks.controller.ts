import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DeleteCardsDto } from './dto/delete-cards.dto';
import { SearchCardsDto } from './dto/search_cards';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeckIdDto, UpdateDeckDto } from './dto/update-deck.dto';
import { GetUser } from 'src/public/get_user.decorator';
import { AddCardsDto } from './dto/add-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}
  //Se crea un nuevo deck
  @Post('newdeck')
  @UseGuards(AuthGuard)
  createDeck(
    @Body() createDeckDto: CreateDeckDto,
    @GetUser('id_user') id_user: string,
  ) {
    //Se agrega el id_user del usuario al objeto createDeckDto
    //para facilitar el manejo de los datos y no pasar dos parametros
    createDeckDto.id_user = id_user;
    return this.decksService.createDeck(createDeckDto);
  }

  //Este metodo sirve para 2 opcciones
  //1. Actualizar el deck a publico o privado
  //2. Actualizar el nombre del deck
  @Patch()
  @UseGuards(AuthGuard)
  updateNameOrPublicDeck(
    @Body() updateDeckDto: UpdateDeckDto,
    @GetUser('id_user') id_user: string,
  ) {
    updateDeckDto.id_user = id_user;
    return this.decksService.updateNameOrPublicDeck(updateDeckDto);
  }

  //Se elimina por completo el deck por completo de la db
  //Se solicita el id del deck y el id del usuario
  @Delete('/delete/deck/:id')
  @UseGuards(AuthGuard)
  deleteDeck(
    @Param('id') id_deck: string,
    @GetUser('id_user') id_user: string,
  ) {
    return this.decksService.deleteDeckByUser(id_user, id_deck);
  }

  //Se agrega una cartas al deck
  //Se solicita el id del deck, id del usuario y un arreglo de las nuevas cartas
  @Patch('/addcards')
  @UseGuards(AuthGuard)
  addCartsToDeck(
    @Body() addCardsDto: AddCardsDto,
    @GetUser('id_user') id_user: string,
  ) {
    addCardsDto.id_user = id_user;
    return this.decksService.addCartsToDeck(addCardsDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  updateCard(
    @Body() updateCardDto: UpdateCardDto,
    @GetUser('id_user') id_user: string,
  ) {
    updateCardDto.id_user = id_user;
    return this.decksService.updateCard(updateCardDto);
  }

  //Se eliminan cartas del deck permanentemente
  //Se solicita el id del deck, id del usuario y un arreglo de las cartas a eliminar
  @Delete('/cards')
  @UseGuards(AuthGuard)
  deleteCards(
    @Body() deleteCardsDto: DeleteCardsDto,
    @GetUser('id_user') id_user: string,
  ) {
    deleteCardsDto.id_user = id_user;
    return this.decksService.DeleteCards(deleteCardsDto);
  }

  //Se obtienen todos los decks de un usuario
  //Se solicita el id del usuario
  @Get()
  @UseGuards(AuthGuard)
  listDecksByUser(@GetUser('id_user') id_user: string) {
    return this.decksService.listDecksByUser(id_user);
  }

  //Se obtienen todas las cartas de un deck
  //Se solicita el id del deck y el id del usuario
  @Get('/user/cards')
  @UseGuards(AuthGuard)
  listCardsByDeckByUser(
    @Query() deckIdDto: DeckIdDto,
    @GetUser('id_user') id_user: string,
  ) {
    return this.decksService.listCardsByDeckByUser(deckIdDto.id_deck, id_user);
  }

  //Buscador de  decks publicos
  @Get('/public/decks')
  searchDecksPublicks(@Query() searchCardsDto: SearchCardsDto) {
    return this.decksService.searchDecksPublics(searchCardsDto);
  }

  //Se obtiene todo el contenido de la card
  @Get('/public/cards/:id')
  @UseGuards(AuthGuard)
  getDeckPublic(
    @Param() deckIdDto: DeckIdDto,
    @GetUser('id_user') id_user: string,
  ) {
    return this.decksService.getDeckPublic(deckIdDto.id_deck, id_user);
  }

  //Se da like a un deck
  @Patch('/like/:id')
  @UseGuards(AuthGuard)
  likeDeck(@Param('id') id_deck: string, @GetUser('id_user') id_user: string) {
    return this.decksService.likeDeck(id_user, id_deck);
  }

  //Se quita el like a un deck
  @Patch('/unlike/:id')
  @UseGuards(AuthGuard)
  unlikeDeck(
    @Param('id') id_deck: string,
    @GetUser('id_user') id_user: string,
  ) {
    return this.decksService.unlikeDeck(id_user, id_deck);
  }

  // @Get('/public/cards')
  // getDeckPublicNotLogin(@Query() searchCardsDto: SearchCardsDto) {
  //   return this.decksService.getDeckPublicNotLogin(searchCardsDto);
  // }
}
