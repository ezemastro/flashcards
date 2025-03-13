import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Deck } from './entities/deck.entity';
import { Model, Types } from 'mongoose';
import { AddCartsDto } from './dto/add-cards.dto';
import { DeleteCardsDto } from './dto/delete-cards.dto';
import { SearchCardsDto } from './dto/search_cards';

@Injectable()
export class DecksService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  async createDeck(createDeckDto: CreateDeckDto) {
    const newDeck = new this.deckModel(createDeckDto);
    for (const card of newDeck.cards) {
      if (card.category) {
        console.log(card.category);
        newDeck.categories.push(card.category);
      }
    }
    await newDeck.save();
    return newDeck;
  }

  //Este metodo sirve para 2 opcciones
  //1.Actualizar el deck a publico o privado
  //2.Actualizar el nombre del deck
  async updateNameOrPublicDeck(updateDeckDto: UpdateDeckDto) {
    const deck = await this.findDeckByUser(
      updateDeckDto.id_deck,
      updateDeckDto.id_user,
    );
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    if (updateDeckDto.name) {
      deck.name = updateDeckDto.name;
    }
    if (updateDeckDto.public) {
      deck.public = updateDeckDto.public;
    }
    await deck.save();
    return { message: 'Deck updated' };
  }

  async deleteDeck(deleteDeckDto: UpdateDeckDto) {
    const deck = await this.deckModel.findOneAndDelete({
      id_user: deleteDeckDto.id_user,
      _id: deleteDeckDto.id_deck,
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return { message: `The deck called ${deck.name} was deleted` };
  }

  async addCartsToDeck(addCartsDto: AddCartsDto) {
    console.log(addCartsDto);
    const deck = await this.findDeckByUser(
      addCartsDto.id_deck,
      addCartsDto.id_user,
    );
    //se iteran las cartas a agregar
    for (const card of addCartsDto.cards) {
      //se verifica que el deck no tenga mas de 120 cartas
      if (deck.cards.length >= 120) {
        //se rompe el ciclo si ya se llego al limite
        break;
      }
      //se verifica si la carta tiene una categoria y si esta no esta en el deck
      if (card.category && !deck.categories.includes(card.category)) {
        //se agrega la categoria al deck
        deck.categories.push(card.category);
      }
      deck.cards.push({
        question: card.question,
        answer: card.answer,
        category: card.category,
      });
    }
    await deck.save();
    return { message: 'Cards added' };
  }

  async DeleteCards(deleteCardsDto: DeleteCardsDto) {
    const deck = await this.findDeckByUser(
      deleteCardsDto.id_deck,
      deleteCardsDto.id_user,
    );
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    console.log(deleteCardsDto.id_cards);
    //se filtran las cartas que no se quieren eliminar
    const cardsNotDeleted = deck.cards.filter((card) => {
      //se verifica si el id de la carta no esta en el arreglo de cartas a eliminar
      if (!deleteCardsDto.id_cards.includes(card._id.toString())) {
        //si no esta se regresa la carta
        return card;
      }
    });
    //se actualiza el arreglo de cartas del deck a las cartas que no se eliminaron
    deck.cards = cardsNotDeleted;
    await deck.save();
    return { message: 'Cards deleted' };
  }
  //TRAE TODOS LOS DECKS DEL USUARIO, SIN LAS CARDS
  async listDecksByUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid id');
    }
    const decks = await this.deckModel.find(
      {
        id_user: new Types.ObjectId(id),
      },
      {
        id_user: 1,
        name: 1,
        public: 1,
        likes: 1,
        categories: 1,
        cardsCount: { $size: '$cards' },
      },
    );
    if (decks.length === 0) {
      return { message: 'No decks found' };
    }
    if (!decks) {
      throw new NotFoundException('No decks found');
    }
    return decks;
  }

  //LISTA LAS CARTAS DE UN DECK DEL USUARIO
  async listCardsByDeckByUser(deleteDeckDto: UpdateDeckDto) {
    const deck = await this.findDeckByUser(
      deleteDeckDto.id_deck,
      deleteDeckDto.id_user,
    );
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  //BUSCADOR DE DECKS PUBLICOS POR TEXTO
  async searchDecksPublics(searchCardsDto: SearchCardsDto) {
    const { page = 1, limit = 20 } = searchCardsDto;
    const skip = (page - 1) * limit;
    const searchArray = searchCardsDto.search
      .toLowerCase()
      .replace('_', ' ')
      .split(' ');
    console.log(searchArray);
    console.log(searchCardsDto);
    const decks = await this.deckModel.aggregate([
      {
        $match: {
          public: true,
          $or: [
            { name: { $regex: searchCardsDto.search, $options: 'i' } },
            { categories: { $in: [searchCardsDto.category] } },
            { categories: { $in: searchArray } },
          ],
        },
      },
      {
        $project: {
          id_user: 1,
          name: 1,
          public: 1,
          likes: 1,
          categories: 1,
          cardsCount: { $size: '$cards' },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);
    if (decks.length === 0) {
      return { message: 'No decks found' };
    }
    if (!decks) {
      throw new NotFoundException('No decks found');
    }
    return decks;
  }

  async findDeckByUser(id_deck: string, id_user: string) {
    const deck = await this.deckModel.findOne({
      id_user: new Types.ObjectId(id_user),
      _id: new Types.ObjectId(id_deck),
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }
}
