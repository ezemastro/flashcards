import { styled } from 'styled-components'
import { useSession } from '../hook/session'
import { Link } from 'react-router-dom'

export default function Nav () {
  const { session } = useSession()
  return (
    <StyledNav>
      <h2><Link to="/">Flashcards</Link></h2>
      <ul>
        <li><Link to='/cards'>Cards</Link></li>
        <li><Link to='/decks'>Decks</Link></li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
      <div>
        {session?.username
          ? (
            <button>
              {session.username}
            </button>
            )
          : (
            <>
              <Link to='/register' className='secondary'>Sign up</Link>
              <Link to='/login'>Log in</Link>
            </>
            )}
      </div>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  background-color: var(--s-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  padding: 0 2rem;
  height: 5rem;
  width: 100%;

  h2{
    color: var(--black-color);
    font-size: 2rem;
    font-weight: normal;
    width: 13rem;

    a{
      color: var(--black-color);
      text-decoration: none;
    }
  }

  ul {
    background-color: var(--bg-color);
    align-self: end;
    display: flex;
    justify-content: space-around;
    height: 3rem;
    border-radius: 2rem 2rem 0 0;
    width: 30rem;

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
    width: 14rem;
    display: flex;
    gap: 1rem;
    
    a{
      border-radius: 1rem;
      font-size: 1.2rem;
      color: var(--black-color);
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      min-width: 6.5rem;
      background-color: var(--bg-color);
    }

    .secondary{
      background-color: transparent;
      text-decoration: underline;
      text-underline-offset: 0.4rem;
    }
  }
`
