import { styled } from 'styled-components'
import { useSession } from '../hook/session'
import { Link } from 'react-router-dom'

export default function Nav () {
  const { session } = useSession()
  return (
    <StyledNav>
      <h2>Flashcards</h2>
      <ul>
        <li><Link to='/cards'>Cards</Link></li>
        <li><Link to='/decks'>Decks</Link></li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
      {session?.username
        ? (
          <button>
            {session.username}
          </button>
          )
        : (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
          )}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  background-color: lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  font-size: 1.5rem;

  ul {
    background-color: white;
    align-self: end;
    height: 50%;
    display: flex;
    gap: 3rem;
    list-style: none;
    padding: .5rem 2rem 0 2rem;
    border-radius: 2rem 2rem 0 0;
  }
`
