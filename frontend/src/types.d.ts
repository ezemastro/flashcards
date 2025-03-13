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
