import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Deck, Like } from './entities/deck.entity';
import { Model, Types } from 'mongoose';
import { DeleteCardsDto } from './dto/delete-cards.dto';
import { SearchCardsDto } from './dto/search_cards';
import { AddCardsDto } from './dto/add-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel(Deck.name) private deckModel: Model<Deck>,
    @InjectModel(Like.name) private likeModel: Model<Like>,
  ) {}

  async createDeck(createDeckDto: CreateDeckDto) {
    const newDeck = new this.deckModel(createDeckDto);
    for (const card of newDeck.cards) {
      if (card.category) {
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
    if (updateDeckDto.description) {
      deck.description = updateDeckDto.description;
    }
    await deck.save();
    return { message: 'Deck updated' };
  }

  async deleteDeckByUser(id_user: string, id_deck: string) {
    const deck = await this.deckModel.findOneAndDelete({
      id_user: id_user,
      _id: id_deck,
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return { message: `The deck called ${deck.name} was deleted` };
  }

  async addCartsToDeck(addCartsDto: AddCardsDto) {
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

  async updateCard(updateCardDto: UpdateCardDto) {
    const deck = await this.findDeckByUser(
      updateCardDto.id_deck,
      updateCardDto.id_user,
    );
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    //SEGUNDA OPCION QUE TUVE PARA ACTUALIZAR LA CARTA
    const valueSet = {};
    if (updateCardDto.question) {
      valueSet['cards.$.question'] = updateCardDto.question;
    }
    if (updateCardDto.answer) {
      valueSet['cards.$.answer'] = updateCardDto.answer;
    }
    if (updateCardDto.category) {
      valueSet['cards.$.category'] = updateCardDto.category;
    }
    await this.deckModel.updateOne(
      {
        _id: new Types.ObjectId(updateCardDto.id_deck),
        'cards._id': new Types.ObjectId(updateCardDto.id_card),
      },
      {
        $set: valueSet,
      },
      {
        arrayFilters: [
          { 'card._id': new Types.ObjectId(updateCardDto.id_card) },
        ],
      },
    );
    return { message: 'Cards updated' };
  }

  async DeleteCards(deleteCardsDto: DeleteCardsDto) {
    const deck = await this.findDeckByUser(
      deleteCardsDto.id_deck,
      deleteCardsDto.id_user,
    );
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
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
    const decks = await this.deckModel
      .find(
        {
          id_user: new Types.ObjectId(id),
        },
        {
          id_user: 1,
          name: 1,
          public: 1,
          likes: 1,
          cards: 1,
          categories: 1,
          cardsCount: { $size: '$cards' },
        },
      )
      .populate({
        path: 'id_creator',
        select: 'user_name',
      });
    if (decks.length === 0) {
      return { message: 'No decks found' };
    }
    if (!decks) {
      throw new NotFoundException('No decks found');
    }
    return decks;
  }

  //LISTA LAS CARTAS DE UN DECK DEL USUARIO
  //@@@@DESUSO@@@@
  async listCardsByDeckByUser(id_deck: string, id_user: string) {
    const deck = await this.findDeckByUser(id_deck, id_user);
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
          id_creator: 1,
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
      {
        $lookup: {
          from: 'users',
          localField: 'id_creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'id_deck',
          as: 'likes',
        },
      },
      {
        $project: {
          id_user: 1,
          name: 1,
          public: 1,
          likes: 1,
          categories: 1,
          cardsCount: 1,
          creator: '$creator.user_name',
        },
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

  async getDeckPublic(id_deck: string, id_user?: string) {
    //se busca el deck por el id y que sea publico y se hace un populate para traer el nombre del creador
    const deck = await this.deckModel
      .findOne({
        _id: new Types.ObjectId(id_deck),
        public: true,
      })
      .populate({ path: 'id_creator', select: 'user_name' });
    //se verifica si mandan el id del usuario
    if (id_user) {
      //se verifica si el usuario ha dado like al deck
      const like = await this.hasUserLikedDeck(id_user, id_deck);
      if (like) {
        deck.set('liked', true, { strict: false });
      }
    }
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async likeDeck(id_user: string, id_deck: string) {
    const existLike = await this.likeModel.findOne({
      id_deck: new Types.ObjectId(id_deck),
      id_user: new Types.ObjectId(id_user),
    });
    if (existLike) {
      throw new NotFoundException('You already liked this deck');
    }
    const newLike = new this.likeModel({
      id_user: id_user,
      id_deck: id_deck,
    });
    await newLike.save();
    await this.deckModel.updateOne(
      { _id: new Types.ObjectId(id_deck) },
      { $inc: { likes: 1 } },
    );
    return { message: 'Deck liked' };
  }

  async unlikeDeck(id_user: string, id_deck: string) {
    const deleteResult = await this.likeModel.deleteOne({
      id_user: new Types.ObjectId(id_user),
      id_deck: new Types.ObjectId(id_deck),
    });
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException('User has not liked this post');
    }
    await this.deckModel.updateOne(
      { _id: new Types.ObjectId(id_deck) },
      { $inc: { likes: -1 } },
    );
    return { message: 'Deck unliked' };
  }

  //METODOS DE AYUDA
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

  async hasUserLikedDeck(id_user: string, id_deck: string) {
    const like = await this.likeModel.findOne({
      id_user: new Types.ObjectId(id_user),
      id_deck: new Types.ObjectId(id_deck),
    });
    return like;
  }
}

//ESTAS SON PRUEBAS DE DIFERENTES AGREGCIONES Y QUEDAN COMO METODO DE ESTUDIO
//PRIMERA OPCCION QUE TUVE PARA ACTUALIZAR LA CARTA
// await this.deckModel.aggregate([
//   //Primero se filtra el deck por el id del deck y el id del usuario
//   {
//     $match: {
//       _id: new Types.ObjectId(addcardsDto.id_deck),
//       id_user: new Types.ObjectId(addcardsDto.id_user),
//     },
//   },
//   //Se descompone el arreglo de cartas, lo que hace unwind es que por cada carta en el arreglo de cartas se crea un nuevo documento
//   {
//     $unwind: '$cards',
//   },
//   //Se busca el documento de la carta que se quiere actualizar por su id
//   {
//     $match: { 'cards.id': new Types.ObjectId(addcardsDto.id_card) },
//   },
//   //Se actualiza la carta
//   {
//     $set: {
//       'cards.question': addcardsDto.question,
//       'cards.answer': addcardsDto.answer,
//       'cards.category': addcardsDto.category,
//     },
//   },
// ]);
