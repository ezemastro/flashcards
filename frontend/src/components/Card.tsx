import styled from 'styled-components'

type Props = {
  card: Card,
  hide: boolean,
  handleHide: () => void
}

export default function Card ({ card, hide, handleHide }: Props) {
  return (
    <StyledCard className="card">
      <p className="question">{card.question}</p>
      <div className={'answer' + (hide ? ' hidden' : '')} onClick={handleHide}>
        <p>{card.answer}</p>
        <img src="" alt="" />
      </div>
      <div className="info">
        <div className="category">{card.category}</div>
        <div className='deck'>
          {/* TODO - Add deck and Links */}
          Deck name
        </div>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  background-color: var(--s-color);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;

  .question {
    font-size: 1.5rem;
    max-height: 5rem;
    flex-grow: 1;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .answer {
    background-color: var(--bg-color);
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    position: relative;

    img {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 2rem;
      width: 2rem;
      pointer-events: none;
    }

    &.hidden{ 
      cursor: pointer;
      p {
      filter: blur(10px);
      user-select: none;
      }
      img {
        opacity: 1;
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    div {
      background-color: var(--bg-color);
      border-radius: 0.5rem;
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
`
