import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDeckCards } from '../services/getDeckCards'
import styled from 'styled-components'
import Card from '../components/Card'
import mockedCards from '../mock/card.json'

export default function Play () {
  const [cards, setCards] = useState<Card[]>(mockedCards.cards)
  const [cardIndex, setCardIndex] = useState(0)
  const [hide, setHide] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      toast.error('Deck not found')
      navigate('/')
      return
    }

    getDeckCards(id)
      .then(cards => setCards(cards))
      .catch(() => toast.error('Something went wrong'))
  }, [])

  const handleHide = () => {
    setHide(false)
  }

  useEffect(() => {
    if (hide) return
    setHide(true)
  }, [cardIndex])

  return (
    <StyledMain>
      {cards.length > 0
        ? (
          <>
            <button onClick={() => setCardIndex(cardIndex - 1)} disabled={cardIndex === 0}>◀</button>
            <Card card={cards[cardIndex]} hide={hide} handleHide={handleHide} />
            <button onClick={() => setCardIndex(cardIndex + 1)} disabled={cardIndex === cards.length - 1}>▶</button>
          </>
          )
        : <p className='loading'>Loading...</p>
      }
    </StyledMain>
  )
}
const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  flex-grow: 1;

  .card {
    width: 25rem;
    height: 30rem;
    .question {
      font-size: 2rem;
    }
    .answer {
      font-size: 1.5rem;
    }
    .category, .deck {
      font-size: 1rem;
    }
  }

  button {
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none; 
    cursor: pointer;
    background-color: var(--t-color);
    color: var(--white-color);
    transition: all 0.2s ease-in-out;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .loading {
    margin: 0 auto;
  }
`
