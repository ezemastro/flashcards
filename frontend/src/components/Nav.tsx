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
            <Link to='/register'>Sign up</Link>
            <Link to='/login'>Login</Link>
          </div>
          )}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  background-color: var(--s-color);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: 5rem;
  width: 100%;

  h2{
    color: var(--black-color);
    font-size: 2rem;
    font-weight: normal;
  }

  ul {
    background-color: var(--bg-color);
    align-self: end;
    display: flex;
    height: 3rem;
    border-radius: 2rem 2rem 0 0;

    li {
      margin: 0 1rem;
      height: 100%;
      width: 6rem;

      a {
        color: var(--black-color);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-decoration: none;
      }
    }
  }

  &>div{
    justify-self: flex-end;
    display: flex;
    gap: 1rem;

    a{
      font-size: 1.2rem;
      color: var(--black-color);
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      width: 6rem;
      background-color: var(--bg-color);
    }
  }
`
