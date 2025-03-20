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
  id_creator: Pick<User, '_id' | 'user_name'>;
  id_user: string;
  cardsCount: number;
  description: string;
  likes: number;
}

type SearchResponse<T extends 'cards' | 'decks'> = T extends 'cards' ? Card[] : T extends 'decks' ? Deck[] : never
