import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Deck ({ deck }: {deck: Deck}) {
  return (
    <StyledDeck className="deck">
      <Link to={`/decks/${deck._id}`}>
        <div className="back-deck" />
        <div className="back-deck" />
        <div className="front-deck">
          <div className="head">
            <div className="cards-count">
              <img src="" alt="" />
              <span>{deck.cardsCount}</span>
            </div>
            <Link to={`/play/${deck._id}`} className='play'>▶</Link>
            <div className="likes">
              <img src="" alt="" />
              <span>{deck.likes}</span>
            </div>
          </div>
          <div className="main">
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
          </div>
          <div className="categories">
            {deck.categories?.map((category, index) => <span key={index}>{category}</span>)}
          </div>
          <p className='creator'>{deck.id_creator.user_name}</p>
        </div>
      </Link>
    </StyledDeck>
  )
}

const StyledDeck = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  a {
    text-decoration: none;
    color: var(--black-color);
  }
  
  .back-deck {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--s-color);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    z-index: -1;

    &:nth-child(2) {
      top: -.4rem;
      left: -.15rem;
    }
    &:nth-child(1) {
      top: -.8rem;
      left: -.3rem;
    }
  }

  .front-deck {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    padding: 1.5rem;
    padding-bottom: 2rem;
    background-color: var(--s-color);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);

    .head {
      display: flex;
      justify-content: space-between;
      position: relative;

      .cards-count, .likes {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--bg-color);
        padding: 0 .3rem;
        border-radius: 0.3rem;

        img {
          width: 1.5rem;
          height: 1.5rem;
        }

        span {
          text-decoration: none;
        }
      }

      .play {
        background-color: var(--black-color);
        color: var(--white-color);
        box-shadow: var(--shadow);
        width: 2rem;
        height: 2rem;
        border-radius: 5rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h2 {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
      }

      p {
        font-size: 1rem;
        font-weight: lighter;
      }
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      justify-content: center;

      span {
        background-color: var(--bg-color);
        padding: .15rem .4rem;
        border-radius: 1rem;
        font-size: 0.8rem;
      }
    }

    .creator {
      position: absolute;
      right: 1rem;
      bottom: 0.5rem;
      font-size: 0.85rem;
    }
  }
`
