import { useEffect, useState } from 'react'
import mockedDecks from '../mock/deck.json'
import styled from 'styled-components'
import Deck from '../components/Deck'
import Results from '../components/Results'
import { getDeckByUser } from '../services/getDeck'
import { useSession } from '../hook/session'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Cards () {
  const { session } = useSession()
  const [decks, setDecks] = useState<Deck[]>(mockedDecks)
  const navigate = useNavigate()

  useEffect(() => {
    if (session === null) {
      toast.error('You must be logged in')
      navigate('/login')
      return
    }

    getDeckByUser(session.id)
      .then(decks => setDecks(decks))
      .catch(() => toast.error('Something went wrong'))
  }, [])

  return (
    <StyledCardsMain>
      <h2>Decks</h2>
      <Results>
        {decks.map(deck => <Deck key={deck._id} deck={deck} />)}
      </Results>
    </StyledCardsMain>
  )
}

const StyledCardsMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;

  h2 {
    text-align: center;
  }
`
