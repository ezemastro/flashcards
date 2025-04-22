interface User {
  _id: string;
  user_name: string;
}

interface Card {
  _id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
interface CardResponse {
  cards: Card[];
}
interface Deck {
  _id: string;
  name: string;
  public: boolean;
  categories: string[];
  creator: string[];
  id_creator: {
    _id: string;
    user_name: string;
  }
  id_user: string;
  cardsCount: number;
  description: string;
  likes: {
    id_user: string;
  }[] | number;
}

type SearchResponse<T extends 'cards' | 'decks'> = T extends 'cards' ? Card[] : T extends 'decks' ? Deck[] : never
