import { useState } from 'react'
import mockedCards from '../mock/card.json'
import styled from 'styled-components'
import Card from '../components/Card'

export default function Cards () {
  const [cards, setCards] = useState<Card[]>(mockedCards.cards)

  return (
    <StyledCardsMain>
      {cards.map(card => <Card key={card._id} card={card} />)}
    </StyledCardsMain>
  )
}

const StyledCardsMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;

  .card {
    width: 20rem;
  }
`
